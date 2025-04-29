<template>
    <div class="login">
      <h1>Inicia sesión</h1>
      <form @submit.prevent="onSubmit">
        <label>
          Email
          <input v-model="email" type="email" required />
        </label>
        <label>
          Contraseña
          <input v-model="password" type="password" required />
        </label>
        <button type="submit">Entrar</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  
  const email = ref('')
  const password = ref('')
  const error = ref<string | null>(null)
  const router = useRouter()
  const auth = useAuthStore()
  
  async function onSubmit() {
    error.value = null
    try {
      await auth.login(email.value, password.value)
      router.push({ name: 'Products' })
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
    }
  }
  </script>