import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Products from '@/views/ProductView.vue'


const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/products', name: 'Products', component: Products }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router