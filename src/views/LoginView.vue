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
    error.value = err instanceof Error ? err.message : String(err)
  }
}
</script>

<style scoped>


</style>