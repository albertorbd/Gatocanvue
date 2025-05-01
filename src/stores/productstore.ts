import { defineStore } from 'pinia';
import api from '@/services/api';
import type { Product } from '@/core/product';

type ProductCreate = Omit<Product, 'id'>;
type ProductUpdate = Omit<Product, 'id'>;

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
  }),

  actions: {
    async fetchAllProducts() {
      const { data } = await api.get<Product[]>('/product');
      this.products = data;
    },

    async createProduct(payload: ProductCreate) {
      await api.post('/product', payload);
      await this.fetchAllProducts();
    },

    async updateProduct(id: number, payload: ProductUpdate) {
      await api.put(`/product/${id}`, payload);
      await this.fetchAllProducts();
    },

    async deleteProduct(id: number) {
      await api.delete(`/product/${id}`);
      await this.fetchAllProducts();
    },
  },
});