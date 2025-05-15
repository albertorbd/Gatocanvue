<template>
    
    <section class="hero-3 mb-12">
      <div class="hero__overlay-2">
        <h1 class="hero__title">Aquí para ti… y para tu mascota</h1>
        <p class="hero__subtitle">Contáctanos y descubre cómo mejorar su bienestar.</p>
      </div>
    </section>

    <section class="contact-section py-12">
    <v-container>
      <v-row align="stretch" class="px-6" dense>
        <!-- Columna Mapa ampliada -->
        <v-col cols="12" md="6" class="pa-4">
          <div class="map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.532941372786!2d-0.8697669235252335!3d41.64422598002415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd591456395885b9%3A0x37a0e08f8bd5347!2sGatocan!5e0!3m2!1ses!2ses!4v1747218647179!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style="border:0;"
              allow="fullscreen"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="pa-4 d-flex pl-10 flex-column justify-center">
          <div class="contact-info">
            <h2 class="text-h4 font-weight-bold mb-4">Contacta con nosotros</h2>
            <p class="mb-3 pt-6">
              <strong>Dirección:</strong><br>
              C. de Florentino Ballesteros, 15, 50002 Zaragoza
            </p>
            <p class="mb-3">
              <strong>Teléfono:</strong><br>
              <a href="tel:+34123456789">976 59 67 60</a>
            </p>
            <p class="mb-3">
              <strong>Email:</strong><br>
              <a href="mailto:info@gatocandealberto.com">info@gatocandealberto.com</a>
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <section class="contact-form-section py-12">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h2 class="text-h4 font-weight-bold text-center mb-6">Haznos tu consulta o pide cita</h2>
          
          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="subject"
              label="Asunto"
              outlined
              dense
              class="mb-4"
              name="subject"
              required
            />
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              outlined
              dense
              type="email"
              class="mb-4"
              name="email"
              required
            />
            <v-textarea
              v-model="message"
              label="Mensaje"
              outlined
              dense
              rows="5"
              auto-grow
              class="mb-6"
              name="message"
              required
            />
            <v-btn
              type="submit"
              color="red darken-1"
              dark
              large
              block
            >
              Enviar mensaje
            </v-btn>
          </v-form>

          <div v-if="formSubmitted" class="text-center mt-6 text-success text-subtitle-1">
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
  const content = { subject: subject.value, email: email.value, message: message.value }
  const res = await fetch('https://formspree.io/f/xdkgyobk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content)
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
<style scoped>

.hero__overlay-2{
 margin-top: 100px;
    margin-left: 1000px;
    background-color: rgba(201, 10, 10, 0.918);
    padding: 1.5rem;
    text-align: center;
    border-radius: 8px;
}
</style>