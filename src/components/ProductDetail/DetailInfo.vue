<template>
  <v-card-title class="detail-title">
    {{ name }}
  </v-card-title>
  <div class="detail-brand-container">
    <span class="detail-brand">{{ brand }}</span>
  </div>
  <v-divider />
  <v-card-text class="detail-text">
    {{ description }}
  </v-card-text>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  brand: string
  description: string
}>()
</script>

<style scoped>
.detail-title {
  font-size: 27px;
  font-weight: 700;
  text-align: center;
  color: #333333;
}
.detail-brand-container {
  text-align: center;
  margin-bottom: 16px;
}
.detail-brand {
  font-size: 0.9rem;
  color: #777;
}
.detail-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #555555;
  padding: 16px 24px;
}
</style>