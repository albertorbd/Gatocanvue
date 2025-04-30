
<template>
  <div class="profile">
    <h1>Mi Perfil</h1>

    <div v-if="userStore.profile">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Rol:</strong> {{ user.role }}</p>
      

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
    </div>

    <button @click="logout" class="logout-btn">Cerrar sesión</button>

    <DepositModal
      :visible="showDepositModal"
      @close="showDepositModal = false"
      @deposit="onDeposit"
    />
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
const txStore   = useTransactionStore();

const showDepositModal = ref(false);

const userId = computed<number|undefined>(() => authStore.user?.id);
const user   = computed(() => userStore.profile!);
const balance = computed(() => userStore.profile?.balance ?? 0);

function openDeposit() {
  showDepositModal.value = true;
}

async function onDeposit(amount: number) {
  const id = userId.value;
  if (id === undefined) {
    console.error('Usuario no autenticado');
    return;
  }

  await txStore.deposit(id, amount, 'App');
  await userStore.fetchProfile(id);
}

function logout() {
  authStore.logout();
  router.push({ name: 'Login' });
}

onMounted(async () => {
  if (userId.value == null) return; 
  await userStore.fetchProfile(userId.value);
  await txStore.fetchByUser(userId.value);
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
.profile h1 {
  text-align: center;
  margin-bottom: 1rem;
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