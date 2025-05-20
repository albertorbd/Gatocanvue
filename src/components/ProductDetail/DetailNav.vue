<template>
  <div class="detail-buttons-container">
    <v-btn
      color="white"
      class="detail-nav-btn"
      small
      @click="$router.push({ name: 'Home' })"
    >
      ← Volver
    </v-btn>
    <v-btn
      color="white"
      class="detail-nav-btn"
      small
      @click="$router.push({ name: 'Products' })"
    >
      Más Productos
    </v-btn>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line vue/valid-define-props
defineProps() 
</script>

<style scoped>
.detail-buttons-container {
  position: absolute;
  top: 24px;
  left: 24px;
  display: flex;
  gap: 12px;
  z-index: 10;
}
.detail-nav-btn {
  color: #e53935 !important;
  background: #ffffff;
  text-transform: none !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.detail-nav-btn:hover {
  background: #f0f0f0 !important;
}
</style>