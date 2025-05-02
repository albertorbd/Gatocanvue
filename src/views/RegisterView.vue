<!-- src/views/RegisterView.vue -->
<template>
    <div class="register">
      <h1>Regístrate</h1>
      <form @submit.prevent="onSubmit" class="register-form">
        <label>
          Nombre
          <input v-model="name" type="text" required />
        </label>
        <label>
          Apellidos
          <input v-model="lastname" type="text" required />
        </label>
        <label>
          Email
          <input v-model="email" type="email" required />
        </label>
        <label>
          Contraseña
          <input v-model="password" type="password" required minlength="6" />
        </label>
        <button type="submit" class="btn">Registrarse</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import type { UserCreateDto } from '@/core/user';
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
    const dto: UserCreateDto = {
      name: name.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value
    };
    try {
      
      await authStore.register(dto.name, dto.lastname, dto.email, dto.password);
      
      router.push('/profile');
    } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
    
      error.value = err.response?.data as string || 'Error registrando usuario.';
    } else {
      error.value = String(err);
    }
    console.error(err);
  }
  }
  </script>
  
  <style scoped>
  .register {
    max-width: 400px;
    margin: 2rem auto;
    padding: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .register h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  .register-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .register-form label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
  }
  .register-form input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn {
    padding: 0.75rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #369870;
  }
  .error {
    color: #e53e3e;
    text-align: center;
  }
  </style>
  