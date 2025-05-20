
import { defineStore } from 'pinia';
import api from '@/services/api';
import type { Cart, CartAddDto, CartUpdateDto } from '@/core/cart';
import { useAuthStore } from './auth';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: null as Cart | null,
  }),

  actions: {
    
    async fetchCart() {
      const auth = useAuthStore();
      if (!auth.user) return;
      const { data } = await api.get<Cart>(`/cart/${auth.user.id}`);
      this.cart = data;
    },

    async addToCart(dto: CartAddDto) {
      const auth = useAuthStore();
      if (!auth.user) throw new Error('Usuario no autenticado');
      await api.post(`/cart/${auth.user.id}/add`, dto);
      await this.fetchCart();
    },

    
    async updateQuantity(dto: CartUpdateDto) {
        const auth = useAuthStore();
        if (!auth.user) return;
        await api.put(
          `/cart/${auth.user.id}/update`,
          dto
        );
        
        await this.fetchCart();
      },
    async removeFromCart(productId: number) {
      const auth = useAuthStore();
      if (!auth.user) return;
      await api.delete(`/cart/${auth.user.id}/remove/${productId}`);
      await this.fetchCart();
    },

   
    async clearCart() {
      const auth = useAuthStore();
      if (!auth.user) return;
      await api.delete(`/cart/${auth.user.id}/clear`);
      this.cart = { id: 0, userId: auth.user.id, items: [], dateCreated: new Date().toISOString() };
    }
  }
});
