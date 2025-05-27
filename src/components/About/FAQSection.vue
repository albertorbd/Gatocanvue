<template>
  <section class="about-us-faq-section py-12">
    <h2 class="font-weight-bold text-center mb-8">Preguntas Frecuentes</h2>
    <v-container>
      <v-row dense>
        <v-col cols="12" md="8" class="mx-auto">
          <div
            v-for="(item, idx) in faqs"
            :key="idx"
            class="about-us-faq-item mb-6 pa-4"
          >
            <div class="d-flex justify-space-between align-center">
              <p class="font-weight-bold">
                {{ item.question }}
              </p>
              <v-btn
                icon
                small
                color="red darken-2"
                @click="item.open = !item.open"
              >
                <span class="about-us-faq-toggle">
                  {{ item.open ? '×' : '+' }}
                </span>
              </v-btn>
            </div>
            <p v-if="item.open" class="mt-4">
              {{ item.answer }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface FAQ {
  question: string
  answer: string
  open: boolean
}

const faqs = reactive<FAQ[]>([
  {
    question: '¿Cómo reservo una cita para el servicio de adiestramiento o peluquería?',
    answer:
      'Puedes solicitar tu cita a través de nuestro formulario online o llamando al teléfono que encontrarás en la sección “Contacto”. Nuestro equipo confirmará día y hora de forma inmediata',
    open: false,
  },
  {
    question: '¿Puedo devolver un producto si no me convence?',
    answer:
      'Sí, aceptamos devoluciones en un plazo de 30 días desde la recepción del pedido. El producto debe estar sin usar y en su embalaje original.',
    open: false,
  },
  {
    question: '¿Cómo funciona el servicio de adiestramiento?',
    answer:
      'Nuestro adiestrador certificado ofrece sesiones tanto a domicilio como en nuestra sede. Contacta para reservar una evaluación inicial gratuita.',
    open: false,
  },
  {
    question: '¿Tienen planes de alojamiento para estancias largas?',
    answer:
      'Sí, ofrecemos planes diarios, semanales y mensuales. Incluyen paseo y atención personalizada. Contacta con nosotros para conocer más.',
    open: false,
  },
])
</script>