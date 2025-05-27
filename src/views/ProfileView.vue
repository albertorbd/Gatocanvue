<template>
  <div class="profile-background">
  <v-container class="profile-page">
 
  <v-row class="profile-header" align="center" justify="space-between">
    <v-col cols="12" md="8">
      <h1 class="profile-name">
        {{ userStore.profile?.name }} {{ userStore.profile?.lastname }}
      </h1>
      <p class="profile-email">{{ userStore.profile?.email }}</p>
    </v-col>
    <v-col cols="12" md="4" class="text-md-right">
      <v-btn class="profile-edit-btn" @click="showEdit = true">
        Editar perfil
      </v-btn>
    </v-col>
  </v-row>

  
  <v-row class="mt-6">
    <v-col cols="12">
      <div class="profile-field">
        <span class="profile-label">Teléfono:</span>
        <span class="profile-value">
          {{ userStore.profile?.phone || 'Pendiente de actualización' }}
        </span>
        <v-btn
          icon
          @click="showPhoneEdit = true"
          class="profile-edit-btn"
        >
       <i class="fa-solid fa-pencil"></i>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12">
      <div class="profile-field">
        <span class="profile-label">Dirección:</span>
        <span class="profile-value">
          {{ userStore.profile?.address || 'Pendiente de actualización' }}
        </span>
        <v-btn
          icon
          @click="showAddressEdit = true"
          class="profile-edit-btn"
        >
          <i class="fa-solid fa-pencil"></i>
        </v-btn>
      </div>
    </v-col>
  </v-row>


   
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="profile-balance-card pa-4 d-flex align-center">
          <div class="profile-balance-info">
            <div class="profile-balance-label">Saldo disponible</div>
            <div class="profile-balance-amount">{{ balance.toFixed(2) }}€</div>
          </div>
          <v-spacer />
         <v-btn  dark class="profile-add-balance" @click="goToDepositPage">+</v-btn>
        </v-card>
      </v-col>
    </v-row>

    
   <v-row class="mt-8">
  <v-col cols="12">
    <h2 class="profile-section-title">Mis pedidos</h2>
    <v-divider class="mb-4" />
    
   
    <v-row dense class="mx-0">
      <v-col
        v-for="t in filteredTransactions"
        :key="t.id"
        cols="12"
        sm="6"
        md="4"
        class="d-flex"
      >
        <v-card class="pa-4 profile-transaction-card" outlined>
          <v-img
            :src="t.product.imageUrl"
            height="140px"
            class="mb-3 rounded"
            contain
          />
          <v-card-text class="text-center px-2">
            <h6 class="profile-transaction-name text-lg font-semibold mb-2">
              {{ t.product.name }}
            </h6>
            <div class="profile-transaction-quantity text-gray-600 text-sm">
              Cantidad: {{ t.quantity }}
            </div>
            <div class="profile-transaction-price text-gray-800 font-medium text-base">
              Total: {{ (t.product.price * t.quantity).toFixed(2) }}€
            </div>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
             
              variant="flat"
              class="profile-repetir-btn"
              @click="repeatOrder(t)"
            >
              Repetir pedido
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" v-if="!filteredTransactions.length">
        <p class="profile-empty-text">No tienes transacciones todavía.</p>
      </v-col>
    </v-row>
  </v-col>
</v-row>


   
    <v-row class="mt-14 " justify="start">
      <v-col cols="12" class="d-flex">
        <v-btn  class="mr-2 profile-close-session-link" @click="logout">CERRAR SESIÓN</v-btn>
        <v-btn  class="mr-2 profile-delete-link" @click.prevent="deleteAccount">
          ELIMINAR CUENTA
        </v-btn>
        <v-btn
          v-if="authStore.user?.role === 'admin'"
          class="profile-admin-link"
          @click="goAdmin"
        >
          ADMIN
        </v-btn>
      </v-col>
    </v-row>

   
    <v-dialog v-model="showEdit" max-width="500">
      <v-card>
        <v-card-title>Editar perfil</v-card-title>
        <v-card-text>
          <v-form ref="editForm" @submit.prevent="submitEdit">
            <v-text-field
              v-model="editName"
              label="Nombre"
              
              required
            />
            <v-text-field
              v-model="editEmail"
              label="Email"
              :rules="emailRules"
              :error-messages="emailErrorMessage"
              required
            />
           
            <v-text-field
              v-model="editPassword"
              label="Contraseña"
              :rules="passwordRules"
              type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showEdit = false">Cancelar</v-btn>
          <v-btn color="primary" @click="submitEdit">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

   
    <v-dialog v-model="showPhoneEdit" max-width="500">
      <v-card>
        <v-card-title>Editar Teléfono</v-card-title>
        <v-card-text>
          <v-form ref="editPhoneForm" @submit.prevent="submitPhoneEdit">
            <v-text-field
              v-model="editPhone"
              label="Teléfono"
              required
              :rules="phoneRules"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showPhoneEdit = false">Cancelar</v-btn>
          <v-btn color="primary" @click="submitPhoneEdit">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

   <v-dialog v-model="showAddressEdit" max-width="500">
  <v-card>
    <v-card-title>Editar Dirección</v-card-title>
    <v-card-text>
      <v-form ref="editAddressForm" @submit.prevent="submitAddressEdit">
        <v-text-field
          v-model="editAddress"
          label="Dirección"
          required
        />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="showAddressEdit = false">Cancelar</v-btn>
          <v-btn color="primary" type="submit">Guardar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</v-dialog>

<v-dialog v-model="showDeleteDialog" max-width="400">
  <v-card>
    <v-card-title class="text-h6">Eliminar cuenta </v-card-title>
    <v-card-text>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text color="grey" @click="showDeleteDialog = false">No</v-btn>
      <v-btn color="red" @click="confirmDeleteAccount">Sí, eliminar</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<v-snackbar
    v-model="snackbar.visible"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    top
  >
    {{ snackbar.message }}
    
    <template #actions>
      <v-btn text @click="snackbar.visible = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
   
  </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/userStore';
import { useTransactionStore } from '@/stores/transaction';
import { useCartStore } from '@/stores/cartStore';
import axios from 'axios';
import type { Transaction } from '@/core/transaction';
import type { Product } from '@/core/product';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const txStore = useTransactionStore();
const cartStore = useCartStore();
const showEdit = ref(false);
const showPhoneEdit = ref(false);
const showAddressEdit = ref(false);
const editName = ref('');
const editPassword = ref('');
const editEmail = ref('');
const editPhone = ref('');
const editAddress = ref('');
const emailErrorMessage = ref('');

const emailRules = [
  (v: string) => !!v || 'El correo electrónico es obligatorio.',
  (v: string) => /.+@.+\..+/.test(v) || 'Debe ser un correo electrónico válido.'
];

const passwordRules = [
  (v: string) => !v || v.length >= 6 || 'Mínimo 6 caracteres.',
];
const phoneRules = [
  (v: string) => !!v || 'El teléfono es obligatorio.',
  (v: string) => /^[6789]\d{8}$/.test(v) || 'Teléfono no válido.',
];

const filteredTransactions = computed< (Transaction & { product: Product })[]>(
  () => txStore.transactions.filter(
    (t): t is Transaction & { product: Product } => !!t.product
  )
);

const snackbar = ref({
  visible: false,
  message: '',
  color: 'success',
  timeout: 2000,   
});


const balance = computed(() => userStore.profile?.balance ?? 0);

const showDeleteDialog = ref(false);


onMounted(async () => {
  const id = authStore.user?.id;
  if (!id) return;
  await userStore.fetchProfile(id);
  await txStore.fetchByUser(id);
  editName.value = userStore.profile?.name ?? '';
  editPassword.value = userStore.profile?.password ?? '';
  editEmail.value = userStore.profile?.email ?? '';
   editPhone.value = userStore.profile?.phone ?? '';
  editAddress.value = userStore.profile?.address ?? '';
});

function logout() {
  authStore.logout();
  router.push({ name: 'Login' });
}
function goAdmin() {
  router.push({ name: 'Admin' });
}

function goToDepositPage() {
  router.push({ name: 'Deposit' }); 
}

function repeatOrder(transaction: Transaction & { product: Product }): void {
  cartStore.addToCart({ productId: transaction.product.id, quantity: transaction.quantity })
    .then(() => {
      
      snackbar.value.message = 'Pedido repetido con éxito';
      snackbar.value.color = 'success';
      snackbar.value.visible = true;
    })
    .catch(err => {
      console.error('Error al repetir pedido:', err);
     
    });
}

async function submitEdit() {
  const id = userStore.profile?.id;
  if (!id) return;

  try {
    await userStore.updateProfile(id, {
      name: editName.value,
      email: editEmail.value,
      password: editPassword.value,
    });
    
    emailErrorMessage.value = ''; 
    showEdit.value = false; 

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        const message = error.response.data.message || '';
        if (message.includes('correo electrónico ya está en uso')) {
          emailErrorMessage.value = 'Este correo electrónico ya está en uso.';
        } else {
          emailErrorMessage.value = 'Error al actualizar el perfil.';
        }
      } else {
        emailErrorMessage.value = 'Error al actualizar el perfil.';
      }
    } else {
      emailErrorMessage.value = 'Error inesperado.';
    }
  }
}
async function deleteAccount() {
 showDeleteDialog.value = true;
}


async function confirmDeleteAccount() {
  const id = authStore.user?.id;
  if (!id) return;
  await userStore.deleteMyAccount();
  authStore.logout();
  router.push({ name: 'Register' });
}

async function submitPhoneEdit() {
  const id = authStore.user?.id;
  if (!id) return;
  await userStore.updateProfile(id, { phone: editPhone.value });
  showPhoneEdit.value = false;
}

async function submitAddressEdit() {
  const id = authStore.user?.id;
  if (!id) return;
  await userStore.updateProfile(id, { address: editAddress.value });
  showAddressEdit.value = false;
}
</script>

<style scoped>
.profile-background{
  background-color: #f5f5f5;
}
.profile-page {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 60px;
  padding-bottom: 60px;
 
}
.profile-header {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
}
.profile-name {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}
.profile-email {
  color: #666;
  margin: 0.25rem 0;
}
.profile-balance-card {
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 8px;
}
.profile-balance-info {
  display: flex;
  flex-direction: column;
}
.profile-balance-label {
  font-weight: 500;
  color: #555;
  font-family: 'Open Sans', sans-serif;
}
.profile-balance-amount {
  font-size: 1.4rem;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif;
}
.profile-add-balance {
  margin-left: auto;
  font-size: 20px;
  background-color: #e90202; 
  color: #fff;
}
.profile-section-title {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.profile-purchased-card {
  transition: box-shadow 0.2s;
}
.profile-purchased-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.profile-purchased-name {
  font-size: 0.95rem;
  font-weight: 500;
}
.profile-purchased-price {
  font-size: 0.85rem;
  color: #777;
}
.profile-empty-text {
  text-align: center;
  color: #777;
  font-style: italic;
}
.profile-delete-link {
  text-transform: none;
   background-color: #e90202; 
  color: #fff;
}
.profile-delete-link:hover {
  text-decoration: underline;
  background-color: #e05151;
}

.profile-admin-link{
  text-transform: none;
  background-color: #e90202; 
  color: #fff;
}

.profile-admin-link:hover {
  text-decoration: underline;
   background-color: #e05151;
}

.profile-close-session-link{
    color: #e53e3e;
  text-transform: none;
   background-color: #e90202; 
  color: #fff;
}
.profile-close-session-link:hover {
  background-color: #e05151;
   text-decoration: underline;
}

.profile-field {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.profile-label {
  font-weight: bold;
  margin-right: 8px;
  font-size: 20px;
  font-family: 'Open Sans', sans-serif;
}

.profile-value {
  flex-grow: 1;
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
}

.profile-edit-btn {
  margin-left: 5px;
  font-size: 14px;
  background-color: #e90202; 
  color: #fff;
}

.profile-edit-btn:hover{
  background-color: #d35353; 
}
.profile-transaction-card {
  margin: 12px;      
  transition: box-shadow 0.2s ease;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.profile-transaction-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.v-btn--flat {
  box-shadow: none !important;
}
.profile-transaction-name { 
  font-size: 19px !important;
   font-weight: 600; 
   
   
}
.profile-transaction-quantity,
.profile-transaction-price {
   font-size: 16px;
   
   color: #777;
    }

.profile-repetir-btn{
  background-color: #d32f2f; 
  color: #ffffff; 
  border-radius: 8px; 
  font-weight: 500;
  font-size: 14px; 
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 30px; 
  transition: all 0.3s ease; 
   background-color: #e90202; 
  color: #fff;
}
.profile-repetir-btn:hover{
  background-color: #d35353; 
  transform: translateY(-2px); 
}

.repetir-pedido-btn::before {
  display: none;
}

</style>