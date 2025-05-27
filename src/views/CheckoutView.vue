<template>
  <div class="checkout-background">
  <v-container class="checkout-page" v-if="cart && cart.items.length">
    <v-row no-gutters>
      <v-col cols="12" md="7">
        <v-card class="checkout-cart-card" elevation="4" rounded="lg">
          <v-card-title class="checkout-cart-card__title">Tu carrito</v-card-title>
          <v-divider />
          <v-list two-line class="checkout-product-list px-4 py-2">
            <v-list-item
              v-for="item in cart.items"
              :key="item.productId"
              class="checkout-product-list__item"
            >
              <v-img
                :src="item.product.imageUrl"
                class="checkout-product-image"
              />
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  {{ item.product.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="grey--text text--darken-1">
                  {{ item.quantity }} × {{ item.product.price.toFixed(2) }}€ =
                  <strong>{{ (item.quantity * item.product.price).toFixed(2) }}€</strong>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-text class="checkout-cart-card__total">
            <span>Total:</span>
            <span class="checkout-cart-card__amount">{{ total.toFixed(2) }}€</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5" class="pl-md-6">
        <v-card outlined class="mb-6 pa-4">
          <div class="d-flex justify-space-between align-center mb-2">
            <h5 class="checkout-title mb-0">Datos de envío</h5>
            <v-btn small class="checkout-edit-btn" @click="startEdit">Editar</v-btn>
          </div>
          <template v-if="!isEditing">
            <p class="checkout-cursiva mb-1">{{ userStore.profile?.address || '—' }}</p>
            <p class="checkout-cursiva mb-0">{{ userStore.profile?.phone || '—' }}</p>
          </template>
          <template v-else>
            <v-form @submit.prevent="saveProfile">
              <v-text-field
                v-model="editedAddress"
                label="Dirección"
                dense
                outlined
                required
              />
              <v-text-field
                v-model="editedPhone"
                label="Teléfono"
                dense
                outlined
                required
              />
              <div class="mt-3 d-flex">
                <v-btn type="submit" color="error" small>Guardar</v-btn>
                <v-btn small class="ml-2" @click="cancelEdit">Cancelar</v-btn>
              </div>
            </v-form>
          </template>
        </v-card>
        <v-card outlined class="mb-4 pa-4">
          <h5 class="section-title mb-3">Método de pago</h5>
          <v-chip-group
            v-model="paymentMethod"
            column
            active-class="white--text"
          >
            <v-chip value="balance" color="error" class="ma-1">
              Balance ({{ balance.toFixed(2) }}€)
            </v-chip>
            <v-chip value="card" color="error" class="ma-1">
              Tarjeta
            </v-chip>
          </v-chip-group>
        </v-card>
       <div v-if="paymentMethod === 'card'" class="mb-4">
  <template v-if="userStore.profile?.address?.trim()">
    <StripeCheckout
      :amount="total"
      @success="onCardSuccess"
      @error="onCardError"
    />
  </template>
  <v-alert v-else type="warning" border="start" colored-border color="orange" elevation="2">
    Rellena tu dirección de envío para activar el pago con tarjeta.
    </v-alert>
  </div>
      <v-btn class="checkout-confirm-btn"
      v-if="paymentMethod === 'balance'"
      :loading="processing"
      block
      large
      @click="confirmCheckout">Confirmar pedido</v-btn>
      </v-col>
    </v-row>
  </v-container>
  

  
  <div v-else class="text-center pa-8">
    <p>Tu carrito está vacío.</p>
  </div>
</div>

  
  <v-snackbar
    v-model="snackbar.show"
    :timeout="2000"
    top
    color="success"
  >
    {{ snackbar.text }}
    <template #actions>
      <v-btn text @click="snackbar.show = false">Cerrar</v-btn>
    </template>
  </v-snackbar>

  <div v-if="alertMsg.show" class="checkout-custom-alert">
    {{ alertMsg.message }}
  </div>

  
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
import { useTransactionStore } from '@/stores/transaction';
import { useUserStore } from '@/stores/userStore';
import { useAuthStore } from '@/stores/auth';
import StripeCheckout from '@/components/StripeCheckout.vue';

const cartStore = useCartStore();
const txStore = useTransactionStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const alertMsg = ref({
  show: false,
  message: '',
  color: 'error',
});


const paymentMethod = ref<'balance'|'card'>('balance');
const processing = ref(false);
const snackbar = ref({ show: false, text: '' });

const isEditing = ref(false);
const editedAddress = ref('');
const editedPhone = ref('');

const cart = computed(() => cartStore.cart!);
const total = computed(() =>
  cart.value.items.reduce((sum, i) => sum + i.quantity * i.product.price, 0)
);
const balance = computed(() => userStore.profile?.balance ?? 0);

onMounted(async () => {
  const userId = authStore.user?.id;
  if (userId != null) {
    if (!userStore.profile) {
      await userStore.fetchProfile(userId);
    }
    editedAddress.value = userStore.profile?.address || '';
    editedPhone.value = userStore.profile?.phone || '';
  }
  if (!cartStore.cart) {
    await cartStore.fetchCart();
  }
});

async function confirmCheckout() {
  const userId = authStore.user?.id;
  if (!userId) return alert('Debes iniciar sesión.');

  if (!userStore.profile?.address?.trim()) {
    showAlert('Por favor, añade los datos de envio antes de continuar.');
    return;
  }
  if (paymentMethod.value === 'balance' && balance.value < total.value) {
    showAlert('Saldo insuficiente para completar la compra.');
    return;
  }

  processing.value = true;
  try {
    for (const item of cart.value.items) {
      await txStore.purchase({ userId, productId: item.productId, quantity: item.quantity, paymentMethod: 'Balance' });
    }

    completePurchase();
  } catch {
    showAlert('Error al procesar la compra.');
  } finally {
    processing.value = false;
  }
}

async function onCardSuccess() {
  const userId = authStore.user?.id;
  if (!userId) return alert('Usuario no autenticado.');
  if (!userStore.profile?.address?.trim()) {
   showAlert('Por favor, añade los datos de envio antes de continuar.');
    return;
  }

  processing.value = true;
  try {
    for (const item of cart.value.items) {
      await txStore.purchase({ userId, productId: item.productId, quantity: item.quantity, paymentMethod: 'Tarjeta' });
    }
    completePurchase();
  } catch {
    showAlert('Error registrando la compra');
  } finally {
    processing.value = false;
  }
}


function onCardError(msg: string) {
  processing.value = false;
  alert(msg);
}

function startEdit() { isEditing.value = true; }
async function saveProfile() {
  const userId = authStore.user?.id;
  if (!userId) return alert('Usuario no autenticado.');
  try {
    await userStore.updateProfile(userId, { address: editedAddress.value, phone: editedPhone.value });
    isEditing.value = false;
    showSuccess('Datos actualizados!');
  } catch {
    showAlert('Error actualizando perfil.')
  }
}
function cancelEdit() {
  isEditing.value = false;
  editedAddress.value = userStore.profile?.address || '';
  editedPhone.value = userStore.profile?.phone || '';
}

function showSuccess(text = '¡Éxito!') {
  snackbar.value.text = text;
  snackbar.value.show = true;
}

function completePurchase() {
  showSuccess('Compra realizada con éxito');
  setTimeout(async () => {
    await cartStore.clearCart();
    router.push({ name: 'Profile' });
  }, 2000);
}

function showAlert(message: string) {
  alertMsg.value.message = message;
  alertMsg.value.show = true;
  setTimeout(() => {
    alertMsg.value.show = false;
  }, 2000); 
}
</script>

<style scoped>
.checkout-background{
  background-color: #f5f5f5;
}
.checkout-page { 
  max-width: 960px;
   margin: 0 auto;
   padding-bottom: 120px !important;
   padding-top: 120px!important;
  
  }
.checkout-cart-card { 
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px; }
.checkout-cart-card__title {
   font-size: 1.5rem;
   font-weight: 600; 
   padding: 16px 24px;
    color: #333; 
  }
.checkout-product-list__item {
   display: flex; 
   align-items: center; 
   padding: 12px 0; 
  }
.checkout-product-image { width: 72px;
   height: 72px; 
   border-radius: 4px;
    margin-right: 16px; 
    object-fit: contain; 
  }
.checkout-edit-btn{
  background-color: #e90202;
  color: white;
}

.checkout-edit-btn:hover{
   background-color: #cf4a4a;
}
 .checkout-confirm-btn{
  background-color: #e90202;
    color: white;
 }

 .checkout-confirm-btn:hover{
  background-color: #cf4a4a;
 }
.checkout-cart-card__total { 
  display: flex;
   justify-content: 
   flex-end; align-items:
   baseline; 
   padding: 16px 24px; 
   border-top: 1px solid #f0f0f0;
   }
.checkout-cart-card__amount { 
  font-size: 16px;
   font-weight: 700;
   padding-left: 5px;
    color: #e53935;
   }
.checkout-title {
 margin-bottom: 0.5rem;
   }
.checkout-cursiva {
   font-style: italic;
    color: #555; 
  }
.checkout-custom-alert {
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 1000;
}
.pl-md-6 {
   padding-left: 1.5rem; 
  }
.pa-4 { 
  padding: 1rem !important; 
}
.v-chip {
   cursor: pointer;
    }
</style>
