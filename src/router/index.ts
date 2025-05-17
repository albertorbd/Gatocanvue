import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Products from '@/views/ProductView.vue'
import ProfileView from '@/views/ProfileView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import AboutUs from '@/views/AboutUs.vue'
import ContactView from '@/views/ContactView.vue'
import AdminView from '@/views/AdminView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CartView from '@/views/CartView.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import CheckoutView from '@/views/CheckoutView.vue'



const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/bienvenida', name: 'Bienvenida', component: WelcomeView },
  { path: '/products', name: 'Products', component: Products },
  { path: '/about-us', name: 'AboutUs', component: AboutUs },
  { path: '/contact', name: 'Contact', component: ContactView },

  {
  path: '/deposit',
  name: 'Deposit',
  component: () => import('@/views/DepositModal.vue'),
  meta: { requiresAuth: true }
},

{
  path: '/checkout',
  name: 'Checkout',
  component: CheckoutView,
  meta: { requiresAuth: true }
},

   {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: (route: RouteLocationNormalized): { id: number } => ({
      id: Number(route.params.id)
    })
  },
  {
    path: '/profile',
     name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/cart',
    component: CartView,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAdmin: true }
  }
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