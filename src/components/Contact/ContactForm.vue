<template>
  <section class="contact-form-section py-12">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h2 class="text-h4 font-weight-bold text-center mb-6">
            Haznos tu consulta o pide cita
          </h2>

          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="subject"
              name="subject"
              label="Asunto"
              outlined
              dense
              class="mb-4"
              required
            />
            <v-text-field
              v-model="email"
              name="email"
              label="Correo electrónico"
              type="email"
              outlined
              dense
              class="mb-4"
              required
            />
            <v-textarea
              v-model="message"
              name="message"
              label="Mensaje"
              rows="5"
              auto-grow
              outlined
              dense
              class="mb-6"
              required
            />
            <v-btn type="submit" color="red darken-1" dark large block>
              Enviar mensaje
            </v-btn>
          </v-form>

          <div
            v-if="formSubmitted"
            class="text-center mt-6 text-success text-subtitle-1"
          >
            ¡Gracias por tu mensaje! Te responderemos lo antes posible.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const subject = ref('')
const email = ref('')
const message = ref('')
const formSubmitted = ref(false)

async function submitForm() {
  const payload = {
    subject: subject.value,
    email: email.value,
    message: message.value,
  }
  const res = await fetch('https://formspree.io/f/xdkgyobk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (res.ok) {
    formSubmitted.value = true
    subject.value = ''
    email.value = ''
    message.value = ''
  } else {
    alert('Error al enviar. Inténtalo de nuevo.')
  }
}
</script>