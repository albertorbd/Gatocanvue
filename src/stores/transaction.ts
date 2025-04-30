
import { defineStore } from 'pinia';
import api from '@/services/api';
import type { PurchaseDto, Transaction } from '@/core/transaction';

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [] as Transaction[],
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
    }
  }
});