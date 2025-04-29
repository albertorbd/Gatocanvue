// src/stores/auth.ts
import { defineStore } from 'pinia'
import api from '@/services/api'

interface AuthState {
  token: string
  user: { id: number; email: string; role: string } | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('jwt_token') || '',
    user: null
  }),
  actions: {
    async login(email: string, password: string): Promise<void> {
      const { data } = await api.post('/auth/login', { email, password })
      this.token = data.token
      localStorage.setItem('jwt_token', data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    },
    logout(): void {
      this.token = ''
      this.user = null
      localStorage.removeItem('jwt_token')
      delete api.defaults.headers.common['Authorization']
    }
  }
})