<template>
  <header class="header">
    <div class="header__section header__logo">
      <router-link to="/" class="header__logo-link">
        <img src="/src/assets/logo.png" alt="GatocandeAlberto" class="header__logo-img" />
      </router-link>
    </div>

    <nav class="header__section header__nav">
      <router-link to="/" class="header__link">Inicio</router-link>
      <router-link to="/about-us" class="header__link">Quiénes somos</router-link>
      <router-link to="/products" class="header__link">Productos</router-link>
      <router-link to="/contact" class="header__link">Contacto</router-link>
    </nav>

    <div class="header__section header__actions">
     
      <button @click="handleLoginClick" class="header-icon-btn">
        <i class="fas fa-sign-in-alt fa-lg"></i>
        <span class="header-icon-label">Acceder</span>
      </button>

      
      <button @click="handleProfileClick" class="header-icon-btn">
        <i class="fas fa-user fa-lg"></i>
        <span class="header-icon-label">Perfil</span>
      </button>

      
      <button @click="handleCartClick" class="header-icon-btn header-cart-btn">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" size="lg" />
        <span v-if="cartItemCount > 0" class="header-cart-badge">{{ cartItemCount }}</span>
        <span class="header-icon-label">Carrito</span>
      </button>
    </div>

    <AuthPromptModal
      :visible="showAuthPrompt"
      @close="showAuthPrompt = false"
    />
  </header>
</template>
  
 <script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cartStore';
import AuthPromptModal from './AuthModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();


const showAuthPrompt = ref(false);


const cartItemCount = computed(() => {
  if (!cartStore.cart) return 0;
  return cartStore.cart.items.reduce((sum, item) => sum + item.quantity, 0);
});


onMounted(async () => {
  if (authStore.user) {
    await cartStore.fetchCart();
  }
});


watch(
  () => authStore.user,
  async (newUser) => {    
    if (newUser) {
      await cartStore.fetchCart();
    } else {
      cartStore.cart = null;
    }
  }
);

function handleLoginClick() {
  router.push(authStore.user ? '/bienvenida' : '/login');
}
function handleProfileClick() {
 if (authStore.user) {
  router.push('/profile');
} else {
  showAuthPrompt.value = true;
}
}
function handleCartClick() {
 if (authStore.user) {
  router.push('/cart');
} else {
  showAuthPrompt.value = true;
}
}
</script>
  
  <style scoped>
.header__actions {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}


.header-icon-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.header__logo-img{
padding-top: 20px;
width: 280px;
}
.header-icon-btn,
.header-icon-btn svg,
.header-icon-btn i {
  color: #333;
  transition: color 0.2s ease;
}
.header-icon-btn:hover,
.header-icon-btn:hover svg,
.header-icon-btn:hover i {
  color: #e3342f;
}


.header-icon-label {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: inherit; 
}


.header-cart-badge {
  position: absolute;
  top: -1px;
  right: -1px;
  background: #e3342f;
  color: white;
  border-radius: 9999px;  
  padding: 2px 6px;
  font-size: 0.65rem;
  font-weight: bold;
  line-height: 1;
  box-shadow: 0 0 2px rgba(0,0,0,0.2);
  pointer-events: none;
  transition: transform 0.2s ease;
}


.header-icon-btn .header-cart-btn:hover .header-cart-badge {
  transform: scale(1.1);
}
  </style>
  