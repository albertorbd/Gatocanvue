<template>
    <header class="header">
      <!-- Logo -->
      <div class="header__section header__logo">
        <router-link to="/" class="header__logo-link">Gatocan</router-link>
      </div>
  
      <!-- Menú de navegación -->
      <nav class="header__section header__nav">
        <router-link to="/" class="header__link">Inicio</router-link>
        <router-link to="/about-us" class="header__link">Quiénes somos</router-link>
        <router-link to="/products" class="header__link">Productos</router-link>
        <router-link to="/contact" class="header__link">Contacto</router-link>
      </nav>
  
      <!-- Iconos de usuario -->
      <div class="header__section header__actions">
        <button @click="handleLoginClick" class="header__icon-btn">
          <i class="fas fa-sign-in-alt"></i>
        </button>
        <button v-if="!isAuthenticated" @click="handleRegisterClick" class="header__icon-btn">
          <i class="fas fa-user-plus"></i>
        </button>
        <button @click="handleProfileClick" class="header__icon-btn">
          <i class="fas fa-user"></i>
        </button>
      </div>

      <AuthPromptModal
      :visible="showAuthPrompt"
      @close="showAuthPrompt = false"
    />
    </header>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import AuthPromptModal from './AuthModal.vue';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  const isAuthenticated = computed(() => !!authStore.token);
  const showAuthPrompt  = ref(false); 

  function handleLoginClick() {
    router.push(isAuthenticated.value ? '/bienvenida' : '/login');
  }
  function handleRegisterClick() {
    router.push('/register');
  }
  function handleProfileClick() {
    if (isAuthenticated.value) router.push('/profile');
    else {
    showAuthPrompt.value = true;
  }
}
  </script>
  
  <style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    height: 4rem;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  /* Secciones iguales divididas en tres áreas */
  .header__section {
    display: flex;
    align-items: center;
  }
  
  /* Logo a la izquierda */
  .header__logo {
    flex: 1;
  }
  .header__logo-link {
    font-size: 1.5rem;
    font-weight: bold;
    color: #35495e;
    text-decoration: none;
  }
  
  /* Navegación centrada */
  .header__nav {
    flex: 2;
    justify-content: center;
    gap: 1.5rem;
  }
  .header__link {
    color: #35495e;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem;
    transition: color 0.2s, border-bottom 0.2s;
  }
  .header__link:hover,
  .header__link.router-link-exact-active {
    color: #42b983;
    border-bottom: 2px solid #42b983;
  }
  
  /* Acciones a la derecha */
  .header__actions {
    flex: 1;
    justify-content: flex-end;
    gap: 1rem;
  }
  .header__icon-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #35495e;
    cursor: pointer;
    transition: color 0.2s;
  }
  .header__icon-btn:hover {
    color: #42b983;
  }
  </style>
  