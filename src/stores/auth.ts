
import { defineStore } from 'pinia';
import api from '@/services/api';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  nameid: string;
  name: string;
  email: string;
  role: string;
  balance?: string;
}

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  balance: number;
}

interface AuthState {
  token: string;
  user: AuthUser | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('jwt_token') || '',
    user: null,
  }),
  actions: {
    initialize() {
      if (!this.token) return;
      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      try {
        const decoded = jwtDecode<DecodedToken>(this.token);
        const rawBalance = decoded.balance ?? '0';
        const parsedBalance = parseFloat(rawBalance);
        this.user = {
          id: Number(decoded.nameid),
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
          balance: isNaN(parsedBalance) ? 0 : parsedBalance,
        };
      } catch {
        this.logout();
      }
    },

    async login(email: string, password: string) {
      const { data } = await api.post<{ token: string }>('/auth/login', { email, password });
      this.token = data.token;
      localStorage.setItem('jwt_token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      this.initialize();
    },

    async register(name: string, lastname: string, email: string, password: string) {
      const { data } = await api.post<{ user: AuthUser; token: string }>('/auth/register', {
        name,
        lastname,
        email,
        password,
      });
      
      this.token = data.token;
      localStorage.setItem('jwt_token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      this.user = data.user;
    },

    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('jwt_token');
      delete api.defaults.headers.common['Authorization'];
    },
  },
});