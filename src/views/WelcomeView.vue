<template>
  <div class="welcome-page">
    <div class="welcome-card">
      <h1 class="welcome-title">¡Hola, {{ userName }}!</h1>
      <p class="welcome-text">Ya has iniciado sesión. ¿Deseas desconectarte?</p>
      <button class="welcome-button" @click="logout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();


const userId = authStore.user?.id;

onMounted(() => {
  if (userId) {
    userStore.fetchProfile(userId);
  }
});


const userName = computed(() => {
  return userStore.profile?.name;
});

function logout() {
  authStore.logout();
  router.push('/Login');
}
</script>