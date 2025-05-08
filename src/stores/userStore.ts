
import { defineStore } from 'pinia';
import api from '@/services/api';
import type { User, UserUpdateDto } from '@/core/user';
import { useAuthStore } from './auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as User | null,
    users: [] as User[],
  }),

  actions: {
    async fetchProfile(userId: number) {
      const { data } = await api.get<User>(`/user/${userId}`);
      this.profile = data;
    },

    async updateProfile(userId: number, payload: Partial<UserUpdateDto>) {
      await api.put(`/user/${userId}`, payload);
      await this.fetchProfile(userId);
    },

    async fetchAllUsers() {
      const { data } = await api.get<User[]>('/user');
      this.users = data;
    },

    async deleteMyAccount() {
      const auth = useAuthStore();
      if (!auth.user) throw new Error('Usuario no autenticado');
      await api.delete(`/user/${auth.user.id}`);
      auth.logout();
    },
  },
});
