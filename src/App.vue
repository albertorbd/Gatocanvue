<template>
  <div id="app">
    <HeaderComp />
    <main class="main-content">
      <RouterView />
    </main>
    <FooterComp />
  </div>
</template>

<script setup lang="ts">
import HeaderComp from './components/HeaderComp.vue';
import FooterComp from './components/FooterComp.vue';
</script>

<style scoped>
/* Estilos generales */
#app {
  margin: 0;
  padding: 0;
}

/* Contenido principal */

</style>