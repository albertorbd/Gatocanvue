<!-- src/views/RegisterView.vue -->
<template>
  <div class="register-page">
    <div class="register-card">
      <h1 class="register-title">Regístrate</h1>
      <form @submit.prevent="onSubmit" class="register-form">
        <label class="register-label">
          Nombre
          <input v-model="name" type="text" required class="register-input" />
        </label>
        <label class="register-label">
          Apellidos
          <input v-model="lastname" type="text" required class="register-input" />
        </label>
        <label class="register-label">
          Email
          <input v-model="email" type="email" required class="register-input" />
        </label>
        <label class="register-label">
          Contraseña
          <input v-model="password" type="password" required minlength="6" class="register-input" />
        </label>
        <button type="submit" class="register-button">Registrarse</button>
        <p v-if="error" class="register-error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const name = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const error = ref<string | null>(null);
const router = useRouter();
const authStore = useAuthStore();

async function onSubmit() {
  error.value = null;
  try {
    await authStore.register(name.value, lastname.value, email.value, password.value);
    router.push('/profile');
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data as string || 'Error registrando usuario.';
    } else {
      error.value = String(err);
    }
  }
}
</script>

<style scoped>


</style>