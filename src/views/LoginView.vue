<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Inicia sesión</h1>
      <form @submit.prevent="onSubmit" class="login-form">
        <label class="login-label">
          Email
          <input v-model="email" type="email" required class="login-input" />
        </label>
        <label class="login-label">
          Contraseña
          <input v-model="password" type="password" required class="login-input" />
        </label>
        <button type="submit" class="login-button">Entrar</button>
        <p class="login-footer">
          ¿No tienes cuenta?
          <router-link to="/register" class="register-link">
            Regístrate
          </router-link>
        </p>
        <p v-if="error" class="login-error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const router = useRouter()
const auth = useAuthStore()

async function onSubmit() {
  error.value = null
  try {
    await auth.login(email.value, password.value)
    router.push({ name: 'Profile' })
  } catch (err: unknown) {
  if (axios.isAxiosError(err) && err.response) {
    const status = err.response.status
    const message = err.response.data

    if (status === 404 || status === 401) {
      error.value = message
    } else {
      error.value = 'Ocurrió un error inesperado: ' + message
    }
  } else if (err instanceof Error) {
    error.value = err.message
  } else {
    error.value = 'Error desconocido'
  }
}
}
</script>

<style scoped>


</style>