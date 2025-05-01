
<!-- src/views/ProfileView.vue -->
<template>
  <div class="profile" v-if="authStore.user">
    <div class="profile-header">
      <h1>Mi Perfil</h1>
      <!-- Botón Admin View solo si el usuario autenticado es Admin -->
      <button
        v-if="authStore.user.role === 'admin'"
        class="admin-view-btn"
        @click="goAdmin"
      >
        Admin View
      </button>
    </div>

    <p><strong>ID:</strong> {{ userStore.profile?.id }}</p>
    <p><strong>Name:</strong> {{ userStore.profile?.name }}</p>
    <p><strong>Email:</strong> {{ userStore.profile?.email }}</p>
    <p><strong>Rol:</strong> {{ authStore.user.role }}</p>

    <p class="balance-row">
      <strong>Balance:</strong> {{ balance.toFixed(2) }}€
      <button @click="openDeposit" class="deposit-btn">+</button>
    </p>

    <h2 class="transactions-title">Transacciones</h2>
    <ul class="transactions-list">
      <li v-for="tx in txStore.transactions" :key="tx.id">
        {{ tx.tipo }} – {{ tx.amount.toFixed(2) }}€ el {{ new Date(tx.date).toLocaleDateString() }}
      </li>
    </ul>

    <button @click="logout" class="logout-btn">Cerrar sesión</button>

    <DepositModal
      :visible="showDepositModal"
      @close="showDepositModal = false"
      @deposit="onDeposit"
    />
  </div>
  <div v-else class="loading">
    Cargando perfil...
  </div>
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

const showDepositModal = ref(false);
const balance = computed(() => userStore.profile?.balance ?? 0);

function openDeposit() {
  showDepositModal.value = true;
}

async function onDeposit(amount: number) {
  const id = authStore.user?.id;
  if (!id) return;
  await txStore.deposit(id, amount, 'App');
  await userStore.fetchProfile(id);
}

function logout() {
  authStore.logout();
  router.push({ name: 'Login' });
}

function goAdmin() {
  router.push({ name: 'Admin' });
}

onMounted(async () => {
  const id = authStore.user?.id;
  if (!id) return;
  await userStore.fetchProfile(id);
  await txStore.fetchByUser(id);
});
</script>

<style scoped>
.profile {
  max-width: 480px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.admin-view-btn {
  background-color: #2d3748;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.admin-view-btn:hover {
  background-color: #4a5568;
}
.balance-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.deposit-btn {
  background: #42b983;
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
}
.deposit-btn:hover {
  background: #369870;
}
.transactions-title {
  margin-top: 1.5rem;
  font-weight: bold;
}
.transactions-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 1.5rem;
}
.transactions-list li {
  padding: 0.25rem 0;
  border-bottom: 1px solid #eee;
}
.loading {
  text-align: center;
  padding: 1rem;
  color: #666;
}
.logout-btn {
  display: block;
  margin: 1.5rem auto 0;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.logout-btn:hover {
  background-color: #c53030;
}
</style>
