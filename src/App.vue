<template>
  <div id="app">
    <header class="navbar">
      <nav class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/login" class="nav-link">Login</RouterLink>
        <RouterLink to="/products" class="nav-link">Productos y Servicios</RouterLink>
      </nav>
    </header>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
/* Estilos generales */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

/* Barra de navegación */
.navbar {
  background-color: #35495e;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
}

.nav-link.router-link-exact-active {
  border-bottom: 2px solid #42b983;
}

/* Contenido principal */
.main-content {
  padding: 6rem 2rem 2rem 2rem; /* Añadido padding-top para evitar solapamiento con la navbar */
}
</style>