<template>
  <div class="stripe-checkout">
    <div v-if="error" class="stripe-error">{{ error }}</div>
    <div id="stripe-element" class="stripe-element"></div>
    <button
      class="stripe-pay-button"
      :disabled="loading"
      @click="pay"
    >
      {{ loading ? 'Procesando...' : `Pagar ${formattedAmount}` }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadStripe, type Stripe, type StripeElements, type StripeCardElement } from '@stripe/stripe-js'
import api from '@/services/api'


const props = defineProps<{ amount: number }>()


const emit = defineEmits<{
  (e: 'success'): void
  (e: 'error', message: string): void
}>()

const loading = ref(false)
const error = ref<string|null>(null)
let stripe: Stripe|null = null
let elements: StripeElements|null = null
let card: StripeCardElement|null = null


const formattedAmount = `$${props.amount.toFixed(2)}`

onMounted(async () => {
  stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  if (!stripe) {
    error.value = 'Error inicializando Stripe.'
    emit('error', error.value)
    return
  }
  elements = stripe.elements()
  card = elements.create('card', {
    style: {
      base: { fontSize: '16px', color: '#32325d', '::placeholder': { color: '#aab7c4' } },
      invalid: { color: '#fa755a' }
    }
  })
  card.mount('#stripe-element')
})

async function pay() {
  if (!stripe || !card) return
  loading.value = true
  error.value = null

  try {
    
    const { data } = await api.post('/payments/create-intent', {
      amount: Math.round(props.amount * 100)
    })
    const clientSecret = data.clientSecret

    
    const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card }
    })
    if (stripeError) {
      error.value = stripeError.message || 'Error al procesar la tarjeta'
      emit('error', error.value)
    } else {
      emit('success')
    }
  } catch (e: unknown) {
  let msg = 'Error en el servidor'
  if (e instanceof Error) {
    msg = e.message
  }
  error.value = msg
  emit('error', msg)
}
}
</script>


<style scoped>
.stripe-checkout {
  max-width: 400px;
  margin: 0 auto;
}
.stripe-element {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 16px;
  background: #f9f9f9;
}
.stripe-pay-button {
  width: 100%;
  padding: 12px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.stripe-pay-button:disabled {
  background: #666;
  cursor: not-allowed;
}
.stripe-error {
  color: #e53e3e;
  margin-bottom: 8px;
  text-align: center;
}
</style>