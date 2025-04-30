// src/stores/auth.ts
import { defineStore } from 'pinia'
import api from '@/services/api'
import { jwtDecode } from 'jwt-decode'

interface AuthState {
  token: string
  user: {
    id:      number
    name:    string
    email:   string
    role:    string
    balance: number
  } | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('jwt_token') || '',
    user:  null,
  }),
  actions: {
    async login(email: string, password: string) {
      const { data } = await api.post('/auth/login', { email, password })
      this.token = data.token
      localStorage.setItem('jwt_token', data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

      // Decodificar el JWT:
      const decoded = jwtDecode<{
        nameid:  string
        name:    string
        email:   string
        role:    string
        balance: string
      }>(data.token)

      const rawBalance = decoded.balance as string | undefined
      const parsed    = rawBalance ? parseFloat(rawBalance) : NaN
      const balance   = isNaN(parsed) ? 0 : parsed

      this.user = {
        id:      Number(decoded.nameid),
        name:    decoded.name,     
        email:   decoded.email,              
        role:    decoded.role,               
        balance
      }
    },

    logout() {
      this.token = ''
      this.user  = null
      localStorage.removeItem('jwt_token')
      delete api.defaults.headers.common['Authorization']
    }
  }
})