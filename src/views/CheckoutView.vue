<template>
  <v-container class="checkout-page py-8">
    <h1>Checkout</h1>

    <v-row>
      <v-col cols="12">
        <h2>Tu carrito</h2>
        <v-list two-line>
          <v-list-item v-for="item in cart.items" :key="item.productId">
            <v-list-item-avatar>
              <v-img :src="item.product.imageUrl" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.product.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ item.quantity }} × {{ item.product.price.toFixed(2) }}€ =
                <strong>{{ (item.quantity * item.product.price).toFixed(2) }}€</strong>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="text-right">
          <strong>Total: {{ total.toFixed(2) }}€</strong>
        </div>
      </v-col>
    </v-row>

    
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <h2>Dirección de envío</h2>
        <template v-if="!isEditing">
          <div>{{ userStore.profile?.address || 'No especificada' }}</div>
          <div>{{ userStore.profile?.phone || 'No especificado' }}</div>
          <v-btn color="primary" @click="startEdit " class="mt-2">Editar</v-btn>
        </template>
        <template v-else>
          <v-form @submit.prevent="saveProfile">
            <v-text-field v-model="editedAddress" label="Dirección" required></v-text-field>
            <v-text-field v-model="editedPhone" label="Teléfono" required></v-text-field>
            <v-btn type="submit" color="primary" class="mt-2">Guardar</v-btn>
            <v-btn color="secondary" @click="cancelEdit" class="mt-2 ml-2">Cancelar</v-btn>
          </v-form>
        </template>
      </v-col>
    </v-row>

    
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <h2>Método de pago</h2>
        <v-radio-group v-model="paymentMethod">
          <v-radio :label="`Balance (tienes ${balance.toFixed(2)}€)`" value="balance" />
          <v-radio label="Tarjeta" value="card" />
        </v-radio-group>
      </v-col>
    </v-row>

    
    <v-row class="mt-6">
      <v-col cols="12">
        <v-btn :loading="processing" color="primary" @click="confirmCheckout">
          Confirmar pedido
        </v-btn>
      </v-col>
    </v-row>

    
    <v-row v-if="paymentMethod==='card'" class="mt-4">
      <v-col cols="12">
        <StripeCheckout :amount="total" @success="onCardSuccess" @error="onCardError" />
      </v-col>
    </v-row>

    
    <v-snackbar v-model="snackbar.show" :timeout="3000" top color="green">
      {{ snackbar.text }}
      <template #actions>
        <v-btn text @click="snackbar.show = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useTransactionStore } from '@/stores/transaction'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/auth'
import StripeCheckout from '@/components/StripeCheckout.vue'

const isEditing = ref(false);
const editedAddress = ref('');
const editedPhone = ref('');
const cartStore = useCartStore()
const txStore = useTransactionStore()
const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()
const snackbar = ref({
  show: false,
  text: ''
})

const paymentMethod = ref<'balance'|'card'>('balance')
const processing = ref(false)


const cart = computed(() => cartStore.cart!)
const total = computed(() =>
cart.value.items.reduce((sum, i) => sum + i.quantity * i.product.price, 0)
)
const balance = computed(() => userStore.profile?.balance ?? 0)


onMounted(async () => {
  const userId = authStore.user?.id;
  if (userId != null && !userStore.profile) {
    await userStore.fetchProfile(userId);
  }
  if (!cartStore.cart) {
    await cartStore.fetchCart();
  }
  
  editedAddress.value = userStore.profile?.address || '';
  editedPhone.value = userStore.profile?.phone || '';
});


async function confirmCheckout(){
  const userId = authStore.user?.id;
  if (!userId) return alert('Usuario no autenticado.');

  if (paymentMethod.value === 'balance') {
    if (balance.value < total.value) {
      return alert('No tienes suficiente balance.')
    }
    processing.value = true
    try {
      for (const item of cart.value.items) {
        await txStore.purchase({
          userId,
          productId: item.productId,
          quantity: item.quantity,
          paymentMethod: 'Balance'
        })
      }
      await cartStore.clearCart()
    snackbar.value.text = 'Compra realizada con éxito'
    snackbar.value.show = true
    setTimeout(() => {
    router.push({ name: 'Profile' })}, 1000)
    } catch (e) {
      console.error(e)
      alert('Error en la compra con balance.')
    } finally {
      processing.value = false
    }
  } else {
    
    processing.value = true;
    return;  
  }
}


async function onCardSuccess() {
  const userId = authStore.user?.id
  if (userId == null) {
    alert('Usuario no autenticado.')
    return
  }

  processing.value = true
  try {
    for (const item of cart.value.items) {
      await txStore.purchase({
        userId,
        productId: item.productId,
        quantity: item.quantity,
        paymentMethod: 'Tarjeta'
      })
    }
  
await cartStore.clearCart()
snackbar.value.text = 'Compra realizada con éxito'
snackbar.value.show = true
setTimeout(() => {
  router.push({ name: 'Profile' })
}, 1000)
  } catch (e) {
    console.error(e)
    alert('Error registrando la compra.')
  } finally {
    processing.value = false
  }
}

function onCardError(message: string){
  processing.value = false;
  alert(message);
}

function startEdit() {
  isEditing.value = true;
}

async function saveProfile() {
const userId = authStore.user?.id;
if (!userId) {
alert('Usuario no autenticado.');
return;
}
  try {
  await userStore.updateProfile(userId, {
  address: editedAddress.value,
  phone: editedPhone.value,
  });
  isEditing.value = false;
  if (userStore.profile) {
  userStore.profile.address = editedAddress.value;
  userStore.profile.phone = editedPhone.value;
  } else {
  
  console.error('El perfil del usuario es nulo.');
}
  } catch (e) {
    console.error(e);
    alert('Error al actualizar el perfil.');
  }
}

function cancelEdit() {
  isEditing.value = false;
  
  editedAddress.value = userStore.profile?.address || '';
  editedPhone.value = userStore.profile?.phone || '';
}

</script>

<style scoped>
.checkout-page { max-width: 900px; margin: 0 auto; }
</style>