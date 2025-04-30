<template>
  <div id="app">
    <HeaderComp />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderComp from './components/HeaderComp.vue';
</script>

<style scoped>
/* Estilos generales */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

/* Contenido principal */
.main-content {
  padding: 6rem 2rem 2rem 2rem; /* Ajusta según la altura de tu encabezado */
}
</style>