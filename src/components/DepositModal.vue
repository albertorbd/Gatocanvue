<template>
    <Teleport to="body">
      <div v-show="visible" class="modal-backdrop">
        <div class="modal-window">
          <h2 class="modal-title">Ingresar Dinero</h2>
          <form @submit.prevent="submit">
            <input
              v-model.number="amount"
              type="number"
              min="1"
              placeholder="Cantidad (€)"
              class="modal-input"
              required
            />
            <button type="submit" class="modal-submit-btn">Depositar</button>
          </form>
          <button @click="close" class="modal-close-btn">Cerrar</button>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, ref } from 'vue';
  
  const { visible } = defineProps<{ visible: boolean }>();
  const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'deposit', amount: number): void;
  }>();
  
  const amount = ref<number | null>(null);
  
  function submit() {
    if (amount.value && amount.value > 0) {
      emit('deposit', amount.value);
      close();
    }
  }
  
  function close() {
    emit('close');
  }
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
  }
  .modal-window {
    background: #ff4d4d; padding: 1.5rem; width: 280px;
    border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    text-align: center;
  }
  .modal-title { color: white; margin-bottom: 1rem; }
  .modal-input {
    width: 100%; padding: 0.5rem; margin-bottom: 1rem;
    border-radius: 4px; border: none;
  }
  .modal-submit-btn {
    background: white; color: #ff4d4d; border: none;
    padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;
    margin-right: 0.5rem;
  }
  .modal-close-btn {
    background: #ffe6e6; color: #ff4d4d; border: none;
    padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;
    margin-top: 0.5rem;
  }
  </style>