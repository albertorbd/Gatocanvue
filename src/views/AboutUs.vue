<template>
  <section class="hero-2">
    <div class="hero__overlay">
      <h1 class="hero__title">Tu mascota es nuestra prioridad</h1>
      <p class="hero__subtitle">Llevamos años comprometidos con la felicidad de tu mejor amigo</p>
    </div>
  </section>

   <section class="about-us">
    <v-container>
      <v-row align="stretch">
       
        <v-col cols="12" md="6" class="d-flex align-center">
          <v-img
            src="/src/assets/about-us-historia.jpg"
            alt="Nuestra historia"
            class="about-us__image"
          ></v-img>
        </v-col>

       
        <v-col cols="12" md="6" class="pl-10 d-flex flex-column justify-center">
          <h2 class="about-us__title">Gatocan de Alberto</h2>
          <p class="about-us__text">
            En Gatocan de Alberto, nos apasiona mejorar la vida de tu mascota. Como tienda online especializada, ofrecemos una amplia gama de productos y servicios diseñados para satisfacer las necesidades específicas de cada animal. Desde alimentos de alta calidad hasta juguetes innovadores y accesorios exclusivos, nos aseguramos de que encuentres todo lo necesario para el bienestar y felicidad de tu compañero. Además, brindamos asesoramiento personalizado y atención al cliente dedicada, porque entendemos que cada mascota es única y merece lo mejor.
          </p>
          <p class="about-us__text">
            Desde nuestra fundación en 2022, hemos crecido gracias a la confianza de nuestros clientes y el amor por los animales que compartimos. Te invitamos a conocernos más y descubrir todo lo que podemos ofrecerte.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <section class="team-section py-12">
    <h2 class="text-h3 font-weight-bold text-center mb-8">Nuestro equipo</h2>
    <v-container>
      <v-row justify="center" align="stretch" dense :gutter="24">
       
        <v-col cols="12" sm="6" md="3" class="pa-4">
          <v-card elevation="4" rounded="lg" class="team-card pa-6 text-center">
            <v-avatar size="200" class="mx-auto mb-4">
              <v-img src="/src/assets/veterinaria.jpg" alt="Dra. Martínez" />
            </v-avatar>
            <div class="text-h6 font-weight-bold mb-1">Erica Martínez</div>
            <div class="subtitle-2 text--secondary">Veterinaria</div>
          </v-card>
        </v-col>
        
        <v-col cols="12" sm="6" md="3" class="pa-4">
          <v-card elevation="4" rounded="lg" class="team-card pa-6 text-center">
            <v-avatar size="200" class="mx-auto mb-4">
              <v-img src="/src/assets/adiestrador.jpg" alt="Alberto Gómez" />
            </v-avatar>
            <div class="text-h6 font-weight-bold mb-1">Alberto Gómez</div>
            <div class="subtitle-2 text--secondary">Adiestrador</div>
          </v-card>
        </v-col>
        
        <v-col cols="12" sm="6" md="3" class="pa-4">
          <v-card elevation="4" rounded="lg" class="team-card pa-6 text-center">
            <v-avatar size="200" class="mx-auto mb-4">
              <v-img src="/src/assets/cuidadora.jpg" alt="Ana Román" />
            </v-avatar>
            <div class="text-h6 font-weight-bold mb-1">Ana Román</div>
            <div class="subtitle-2 text--secondary">Cuidador</div>
          </v-card>
        </v-col>
        
        <v-col cols="12" sm="6" md="3" class="pa-4">
          <v-card elevation="4" rounded="lg" class="team-card pa-6 text-center">
            <v-avatar size="200" class="mx-auto mb-4">
              <v-img src="/src/assets/cuidador.jpg" alt="Miguel Sánchez" />
            </v-avatar>
            <div class="text-h6 font-weight-bold mb-1"> Santiago del Pino</div>
            <div class="subtitle-2 text--secondary">Cuidador</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>

   <section class="faq-section py-12">
    <h2 class="text-h2 font-weight-bold text-center mb-8">Preguntas Frecuentes</h2>
    <v-container>
      <v-row dense>
        <v-col cols="12" md="8" class="mx-auto">
          <div
            v-for="(item, idx) in faqs"
            :key="idx"
            class="faq-item mb-6 pa-4"
          >
            <div class="d-flex justify-space-between align-center">
              <div class="text-subtitle-1 font-weight-medium">
                {{ item.question }}
              </div>
              <v-btn
                icon
                small
                color="red darken-2"
                @click="item.open = !item.open"
              >
                
                <span class="faq-toggle">
                  {{ item.open ? '×' : '+' }}
                </span>
              </v-btn>
            </div>
            <div v-if="item.open" class="mt-4">
              {{ item.answer }}
            </div>
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
    answer: 'Puedes solicitar tu cita a través de nuestro formulario online o llamando al teléfono que encontrarás en la sección “Contacto”. Nuestro equipo confirmará día y hora de forma inmediata',
    open: false
  },
  {
    question: '¿Puedo devolver un producto si no me convence?',
    answer: 'Sí, aceptamos devoluciones en un plazo de 30 días desde la recepción del pedido. El producto debe estar sin usar y en su embalaje original.',
    open: false
  },
  {
    question: '¿Cómo funciona el servicio de adiestramiento?',
    answer: 'Nuestro adiestrador certificado ofrece sesiones tanto a domicilio como en nuestra sede. Contacta para reservar una evaluación inicial gratuita.',
    open: false
  },
  {
    question: '¿Tienen planes de alojamiento para estancias largas?',
    answer: 'Sí, ofrecemos planes diarios, semanales y mensuales. Incluyen paseo y atención personalizada. Contacta con nosotros para conocer más.',
    open: false
  }
])
</script>
<style scoped>


.team-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 320px;              
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}


</style>