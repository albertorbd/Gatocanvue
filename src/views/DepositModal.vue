<template>
  <div class="deposit-container">
    <h2 class="deposit-title">Añadir saldo</h2>

    
    <div class="deposit-row">
      <input
        v-model.number="amount"
        type="number"
        min="1"
        placeholder="Cantidad (€)"
        class="deposit-input deposit-input--half"
      />
      <input
        v-model="cardholderName"
        type="text"
        placeholder="Nombre del titular"
        class="deposit-input deposit-input--half"
      />
    </div>

    
    <div class="deposit-row">
      <input
        v-model="city"
        type="text"
        placeholder="Ciudad"
        class="deposit-input deposit-input--half"
      />
      <input
        v-model="postalCode"
        type="text"
        placeholder="Código postal"
        class="deposit-input deposit-input--half"
      />
    </div>

    
    <div id="card-element" class="deposit-stripe-element"></div>
    <div class="card-brand">
    </div>

   
    <button @click="handlePayment" :disabled="loading" class="deposit-button">
      <span v-if="!loading">
        <svg class="lock-icon" viewBox="0 0 24 24">
          <path d="M12 17a2 2 0 100-4 2 2 0 000 4z"/>
          <path d="M17 8h-1V6a4 4 0 00-8 0v2H7a1 1 0 00-1 1v10a1 1 0 
                   001 1h10a1 1 0 001-1V9a1 1 0 00-1-1zm-6 0V6a2 2 0 
                   114 0v2h-4z"/>
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
  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
loadStripe,
type Stripe,
type StripeElements,
type StripeCardElement,
type StripeError } from '@stripe/stripe-js'
import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/userStore'
import { useTransactionStore } from '@/stores/transaction'
import { useRouter } from 'vue-router'

const amount = ref(0)
const cardholderName = ref('')
const city = ref('')
const postalCode = ref('')
const error = ref<string|null>(null)
const loading = ref(false)
const snackbar = ref({
  show: false,
  text: ''
})

let stripe: Stripe|null = null
let elements: StripeElements|null = null
let card: StripeCardElement|null = null
const brandIcon = ref<string|null>(null)

const router = useRouter();

const auth = useAuthStore()
const userStore = useUserStore()
const txStore = useTransactionStore()


onMounted(async () => {
  stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  if (!stripe) {
    error.value = 'No se pudo inicializar Stripe.'
    return
  }
  elements = stripe.elements();
card = elements.create('card', {
  hidePostalCode: true, 
  style: {
    base: {
      fontSize: '16px',
    },
  },
});
card.mount('#card-element');
  
  card.on('change', ev => {
    brandIcon.value = ev.brand && ev.brand !== 'unknown'
      ? `https://js.stripe.com/v3/fingerprints/brand-icon-${ev.brand}.svg`
      : null
  })
})

async function handlePayment() {
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
    
    const { data }: { data: { clientSecret: string } } =
      await api.post('/payments/create-intent', { userId, amount: amount.value })
    const clientSecret = data.clientSecret

   
    const { error: stripeError }: { error?: StripeError } =
      await stripe.confirmCardPayment(clientSecret, {
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
  error.value = stripeError.message ?? 'Error desconocido';
  return;
}

    
    await api.post(`/transactions/${userId}/deposit`, {
      userId, amount: amount.value, paymentMethod: 'Tarjeta'
  })
  await userStore.fetchProfile(userId)
  await txStore.fetchByUser(userId)

  
  snackbar.value.text = 'Compra realizada con éxito'
  snackbar.value.show = true
  setTimeout(() => {
  router.push({ name: 'Profile' });
  }, 1000);
} catch (e) {
  console.error(e);
  error.value = 'Error procesando el pago.';
} finally {
  loading.value = false;
}

}


</script>

<style scoped>
.deposit-container {
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.deposit-title {
  text-align: center;
  margin-bottom: 1.5rem;
}
.deposit-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.deposit-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.deposit-input--half { max-width: 48%; }
.deposit-stripe-element {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}
.card-brand {
  text-align: right;
  margin-bottom: 1rem;
}
.card-brand img {
  height: 24px;
}
.deposit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
}
.lock-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  fill: #fff;
}
.deposit-button:disabled {
  background: #666;
  cursor: not-allowed;
}
.deposit-error {
  color: #e53935;
  text-align: center;
  margin-top: 1rem;
}
</style>