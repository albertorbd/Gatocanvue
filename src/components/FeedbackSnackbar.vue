<template>
  <v-snackbar
    v-model="show"
    :timeout="3000"
    :color="type === 'success' ? 'green darken-1' : 'red darken-1'"
    location="bottom center"
    elevation="6"
    style="z-index: 2000"
  >
    {{ message }}
    <template #actions>
      <v-btn icon @click="show = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, toRefs, watch } from 'vue'

const props = defineProps<{
  message: string | null
  type: 'success' | 'error'
  show: boolean
}>()

const emits = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const { show } = toRefs(props)

watch(show, v => emits('update:show', v))
</script>