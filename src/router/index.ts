import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Products from '@/views/ProductView.vue'
import ProfileView from '@/views/ProfileView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import AboutUs from '@/views/AboutUs.vue'
import ContactView from '@/views/ContactView.vue'


const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/bienvenida', name: 'Bienvenida', component: WelcomeView },
  { path: '/products', name: 'Products', component: Products },
  { path: '/about-us', name: 'AboutUs', component: AboutUs },
  { path: '/contact', name: 'Contact', component: ContactView },

  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()                  
  if (to.meta.requiresAuth && !authStore.token) {  
    return next({ name: 'Login' })
  }
  next()
})

export default router