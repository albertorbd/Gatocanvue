<template>
    <Teleport to="body">
      <div v-show="visible" class="modal-backdrop">
        <div class="modal-window">
          <h2 class="modal-title">Acceso restringido</h2>
          <p class="modal-body">
            Por favor,
            <router-link to="/login" class="modal-link" @click="close">inicia sesión</router-link>
            o
            <router-link to="/register" class="modal-link" @click="close">regístrate</router-link>
            primero.
          </p>
          <button @click="close" class="modal-close-btn">Cerrar</button>
        </div>
      </div>
    </Teleport>
  </template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

// Desestructura 'visible' para usarlo directamente y evitar la alerta de ESLint
const { visible } = defineProps<{ visible: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function close() {
  emit('close')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;                       /* top:0; right:0; bottom:0; left:0; */
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-window {
  background-color: #ff4d4d;      /* fondo rojo */
  padding: 1.5rem;
  width: 280px;                   /* más pequeñito */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  text-align: center;
}

.modal-title {
  margin: 0 0 1rem;
  color: white;
  font-size: 1.25rem;
}

.modal-body {
  color: white;
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
}

.modal-link {
  color: #fff;
  text-decoration: underline;
  margin: 0 0.25rem;
}

.modal-link:hover {
  color: #ffe6e6;
}

.modal-close-btn {
  background-color: white;
  color: #ff4d4d;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.modal-close-btn:hover {
  background-color: #ffe6e6;
}
</style>