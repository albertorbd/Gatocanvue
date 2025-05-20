import { defineStore } from 'pinia';
import api from '@/services/api';
import type { PurchaseDto, Transaction} from '@/core/transaction';
import type { Product } from '@/core/product';
import { useAuthStore } from './auth';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
    purchasedProducts: [] as Product[],
   
  }),
  actions: {
    async fetchByUser(userId: number) {
      const { data } = await api.get<Transaction[]>(`/transactions/${userId}`);
      this.transactions = data;
    },
    async deposit(userId: number, amount: number, method: string) {
      await api.post(`/transactions/${userId}/deposit`, { userId, amount, paymentMethod: method });
      await this.fetchByUser(userId);
    },
    async purchase(dto: PurchaseDto) {
      await api.post(`/transactions/${dto.userId}/purchase`, dto);
      await this.fetchByUser(dto.userId);
    },

    async fetchPurchasedProducts(userId: number) {
      const { data } = await api.get<Product[]>(`/transactions/${userId}/purchased`);
      this.purchasedProducts = data;
    },
   
    async purchaseCart(items: { productId: number; quantity: number }[]) {
      const auth = useAuthStore();
      if (!auth.user) throw new Error('No autenticado');
      const userId = auth.user.id;

      
      for (const item of items) {
        const dto: PurchaseDto = {
          userId,
          productId: item.productId,
          quantity: item.quantity,
          paymentMethod: 'Balance' 
        };
        await this.purchase(dto);
      }
    }
    
  }

  
});
