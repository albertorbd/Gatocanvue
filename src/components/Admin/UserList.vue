<template>
    <div class="admin-user-list">
      <h2>Gestión de Usuarios</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th></tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.name }} {{ u.lastname }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  import type { User } from '@/core/user'
  
  const userStore = useUserStore()
  const users = ref<User[]>([])
  
  onMounted(async () => {
    await userStore.fetchAllUsers()
    users.value = userStore.users
  })
  </script>
  
  <style scoped>
  </style>
  