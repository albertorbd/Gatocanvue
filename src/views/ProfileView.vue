<template>
  <v-container class="profile-page py-8">
 
  <v-row class="profile-header" align="center" justify="space-between">
    <v-col cols="12" md="8">
      <h1 class="profile-name">
        {{ userStore.profile?.name }} {{ userStore.profile?.lastname }}
      </h1>
      <p class="profile-email">{{ userStore.profile?.email }}</p>
    </v-col>
    <v-col cols="12" md="4" class="text-md-right">
      <v-btn color="red" @click="showEdit = true">
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
          color="red"
          @click="showPhoneEdit = true"
          class="edit-btn"
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
          color="red"
          @click="showAddressEdit = true"
          class="edit-btn"
        >
          <i class="fa-solid fa-pencil"></i>
        </v-btn>
      </div>
    </v-col>
  </v-row>


   
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="balance-card pa-4 d-flex align-center">
          <div class="balance-info">
            <div class="balance-label">Saldo disponible</div>
            <div class="balance-amount">{{ balance.toFixed(2) }}€</div>
          </div>
          <v-spacer />
          <v-btn color="red" dark class="add-balance" @click="openDeposit">+</v-btn>
        </v-card>
      </v-col>
    </v-row>

    
    <v-row class="mt-8">
      <v-col cols="12">
        <h2 class="section-title">Productos comprados</h2>
        <v-divider class="mb-4" />
        <v-row dense>
          <v-col
            v-for="p in purchased"
            :key="p.id"
            cols="6"
            sm="4"
            md="3"
            class="d-flex justify-center"
          >
            <v-card class="pa-2 purchased-card" outlined>
              <v-img
                :src="p.imageUrl"
                height="100px"
                contain
              />
              <v-card-text class="text-center">
                <div class="purchased-name">{{ p.name }}</div>
                <div class="purchased-price">{{ p.price.toFixed(2) }}€</div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="!purchased.length">
            <p class="empty-text">No has comprado productos todavía.</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

   
    <v-row class="mt-14 " justify="start">
      <v-col cols="12" class="d-flex">
        <v-btn color="red" class="mr-2 close-session-link" @click="logout">CERRAR SESIÓN</v-btn>
        <v-btn color="red" class="mr-2 delete-link" @click.prevent="deleteAccount">
          ELIMINAR CUENTA
        </v-btn>
        <v-btn
          v-if="authStore.user?.role === 'admin'"
          color="red"
          class="admin-link"
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
              type="email"
              required
            />
           
            <v-text-field
              v-model="editPassword"
              label="Contraseña"
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
    
    <DepositModal
      :visible="showDepositModal"
      @close="showDepositModal = false"
      @deposit="onDeposit"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/userStore';
import { useTransactionStore } from '@/stores/transaction';
import DepositModal from '@/components/DepositModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const txStore = useTransactionStore();
const showEdit = ref(false);
const showPhoneEdit = ref(false);
const showAddressEdit = ref(false);
const showDepositModal = ref(false);
const editName = ref('');
const editPassword = ref('');
const editEmail = ref('');
const editPhone = ref('');
const editAddress = ref('');

const balance = computed(() => userStore.profile?.balance ?? 0);
const purchased = computed(() => txStore.purchasedProducts);


onMounted(async () => {
  const id = authStore.user?.id;
  if (!id) return;
  await userStore.fetchProfile(id);
  await txStore.fetchByUser(id);
  await txStore.fetchPurchasedProducts(id);
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
function openDeposit() {
  showDepositModal.value = true;
}
async function onDeposit(amount: number) {
  const id = authStore.user?.id;
  if (!id) return;
  await txStore.deposit(id, amount, 'App');
  await userStore.fetchProfile(id);
  await txStore.fetchPurchasedProducts(id);
}
async function submitEdit() {
  const id = authStore.user?.id;
  if (!id) return;
  await userStore.updateProfile(id, {
    name: editName.value,
    email: editEmail.value,
    password: editPassword.value,
    
    
  });
  showEdit.value = false;
}
async function deleteAccount() {
  if (!confirm('¿Seguro que quieres eliminar tu cuenta?')) return;
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
.profile-page {
  max-width: 900px;
  margin: 0 auto;
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
.balance-card {
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 8px;
}
.balance-info {
  display: flex;
  flex-direction: column;
}
.balance-label {
  font-weight: 500;
  color: #555;
}
.balance-amount {
  font-size: 1.4rem;
  font-weight: bold;
}
.add-balance {
  margin-left: auto;
  font-size: 20px;
}
.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.purchased-card {
  transition: box-shadow 0.2s;
}
.purchased-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.purchased-name {
  font-size: 0.95rem;
  font-weight: 500;
}
.purchased-price {
  font-size: 0.85rem;
  color: #777;
}
.empty-text {
  text-align: center;
  color: #777;
  font-style: italic;
}
.delete-link {
  color: #e53e3e;
  text-transform: none;
}
.delete-link:hover {
  text-decoration: underline;
}

.admin-link{
   color: #e53e3e;
  text-transform: none;
}

.admin-link:hover {
  text-decoration: underline;
}

.close-session-link{
    color: #e53e3e;
  text-transform: none;
}
.close-session-link:hover {
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
}

.profile-value {
  flex-grow: 1;
  font-size: 20px;
}

.edit-btn {
  margin-left: 5px;
  font-size: 10px;
}
</style>