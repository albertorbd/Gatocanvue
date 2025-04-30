
import { defineStore } from 'pinia';
import api from '@/services/api';
import type { User, UserUpdateDto } from '@/core/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as User | null,
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
  },
});