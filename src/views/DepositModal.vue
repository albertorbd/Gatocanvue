<template>
  <div class="deposit-view">
    <div class="deposit-container">
      <h2 class="deposit-title">Añadir saldo</h2>

    <div class="deposit-row">
  <div class="deposit-input-wrapper">
    <input
      v-model.number="amount"
      type="number"
      min="1"
      placeholder="Cantidad (€)"
      class="deposit-input"
    />
  </div>
  <div class="deposit-input-wrapper">
    <input
      v-model="cardholderName"
      type="text"
      placeholder="Nombre del titular"
      class="deposit-input"
      :class="{ 'deposit-input-error': errors.cardholderName }"
    />
    <p v-if="errors.cardholderName" class="deposit-error-text">{{ errors.cardholderName }}</p>
  </div>
</div>

<!-- Ciudad y Código postal -->
<div class="deposit-row">
  <div class="deposit-input-wrapper">
    <input
      v-model="city"
      type="text"
      placeholder="Ciudad"
      class="deposit-input"
      :class="{ 'deposit-input-error': errors.city }"
    />
    <p v-if="errors.city" class="deposit-error-text">{{ errors.city }}</p>
  </div>
  <div class="deposit-input-wrapper">
    <input
      v-model="postalCode"
      type="text"
      placeholder="Código postal"
      class="deposit-input"
      :class="{ 'input-error': errors.postalCode }"
    />
    <p v-if="errors.postalCode" class="deposit-error-text">{{ errors.postalCode }}</p>
  </div>
</div>

      <div id="card-element" class="deposit-stripe-element"></div>
      <div class="deposit-card-brand"></div>

      <button @click="handlePayment" :disabled="loading" class="deposit-button">
        <span v-if="!loading">
          <svg class="lock-icon" viewBox="0 0 24 24">
            <path d="M12 17a2 2 0 100-4 2 2 0 000 4z" />
            <path
              d="M17 8h-1V6a4 4 0 00-8 0v2H7a1 1 0 
                 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1zm-6 0V6a2 2 0 
                 114 0v2h-4z"
            />
          </svg>
          Pagar {{ amount.toFixed(2) }}€
        </span>
        <span v-else>Procesando...</span>
      </button>

      <p v-if="error" class="deposit-error">{{ error }}</p>

      <v-snackbar v-model="snackbar.show" :timeout="3000" top color="green">
        {{ snackbar.text }}
        <template #actions>
          <v-btn text @click="snackbar.show = false">Cerrar</v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  loadStripe,
  type Stripe,
  type StripeElements,
  type StripeCardElement,
  type StripeError
} from '@stripe/stripe-js'
import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/userStore'
import { useTransactionStore } from '@/stores/transaction'
import { useRouter } from 'vue-router'

const amount = ref(0)
const cardholderName = ref('')
const city = ref('')
const postalCode = ref('')
const error = ref<string | null>(null)
const loading = ref(false)
const snackbar = ref({
  show: false,
  text: ''
})
const errors = ref({
  cardholderName: '',
  city: '',
  postalCode: ''
})

let stripe: Stripe | null = null
let elements: StripeElements | null = null
let card: StripeCardElement | null = null
const brandIcon = ref<string | null>(null)

const router = useRouter()
const auth = useAuthStore()
const userStore = useUserStore()
const txStore = useTransactionStore()

onMounted(async () => {
  stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  if (!stripe) {
    error.value = 'No se pudo inicializar Stripe.'
    return
  }

  elements = stripe.elements()
  card = elements.create('card', {
    hidePostalCode: true,
    style: {
      base: {
        fontSize: '16px'
      }
    }
  })
  card.mount('#card-element')

  card.on('change', ev => {
    brandIcon.value =
      ev.brand && ev.brand !== 'unknown'
        ? `https://js.stripe.com/v3/fingerprints/brand-icon-${ev.brand}.svg`
        : null
  })
})

async function handlePayment() {
  errors.value = {
    cardholderName: '',
    city: '',
    postalCode: ''
  }

  let hasError = false

  if (!cardholderName.value.trim()) {
    errors.value.cardholderName = 'Completa este campo'
    hasError = true
  }
  if (!city.value.trim()) {
    errors.value.city = 'Completa este campo'
    hasError = true
  }
  if (!postalCode.value.trim()) {
    errors.value.postalCode = 'Completa este campo'
    hasError = true
  }

  if (hasError) return

  const userId = auth.user?.id
  if (!userId) {
    error.value = 'Usuario no autenticado.'
    return
  }

  if (!stripe || !card) {
    error.value = 'Stripe.js no cargado correctamente.'
    return
  }

  loading.value = true
  error.value = null

  try {
    const { data }: { data: { clientSecret: string } } = await api.post('/payments/create-intent', {
      userId,
      amount: amount.value
    })

    const clientSecret = data.clientSecret

    const { error: stripeError }: { error?: StripeError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: cardholderName.value,
          address: {
            city: city.value,
            postal_code: postalCode.value
          }
        }
      }
    })

    if (stripeError) {
      error.value = stripeError.message ?? 'Error desconocido'
      return
    }

    await api.post(`/transactions/${userId}/deposit`, {
      userId,
      amount: amount.value,
      paymentMethod: 'Tarjeta'
    })
    await userStore.fetchProfile(userId)
    await txStore.fetchByUser(userId)

    snackbar.value.text = 'Compra realizada con éxito'
    snackbar.value.show = true
    setTimeout(() => {
      router.push({ name: 'Profile' })
    }, 1000)
  } catch (e) {
    console.error(e)
    error.value = 'Error procesando el pago.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

</style>