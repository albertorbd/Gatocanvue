import { defineStore } from 'pinia';
import api from '@/services/api';
import type { Product } from '@/core/product';

type ProductCreate = Omit<Product, 'id'>;
type ProductUpdate = Omit<Product, 'id'>;

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    currentProduct: null as Product | null,
    searchQuery: '',
    selectedBrand: '',
    selectedCategory: '',
    priceOrder: '',
  }),

  actions: {


    resetFilters() {
      this.searchQuery = '';
      this.selectedBrand = '';
      this.selectedCategory = '';
      this.priceOrder = '';
    },
  async fetchAllProducts() {
  const params: Record<string,string|string[]> = {};
  if (this.searchQuery)      params.search     = this.searchQuery;
  if (this.selectedBrand)    params.brands     = [this.selectedBrand];
  if (this.selectedCategory) params.categories = [this.selectedCategory];
  if (this.priceOrder)       params.priceOrder = this.priceOrder;

  const { data } = await api.get<Product[]>('/product', { params });
  this.products = data;
},

  async fetchProductById(id: number) {     
   const { data } = await api.get<Product>(`/product/${id}`);
  this.currentProduct = data;
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

    setSearchQuery(query: string) {
      this.searchQuery = query;
    },

    setSelectedBrand(brand: string) {
      this.selectedBrand = brand;
    },

    setSelectedCategory(category: string) {
      this.selectedCategory = category;
    },

    setPriceOrder(order: string) {
      this.priceOrder = order;
    },
  },
});