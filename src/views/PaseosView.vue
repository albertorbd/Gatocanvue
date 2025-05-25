<template>
  <section class="paseos-hero">
    <div class="paseos-hero__overlay">
      <h1 class="paseos-hero__title">Paseos Caninos</h1>
      <p class="paseos-hero__subtitle">
        Rutas diarias adaptadas al ritmo y energía de tu perro.
      </p>
    </div>
  </section>

  <section class="paseos-info-section">
    <div class="paseos-info-container">
      <h2 class="paseos-title">¿En qué consisten nuestros paseos caninos?</h2>
      <p>
        En <strong>Gatocan de Alberto</strong> entendemos que el paseo es mucho más que una salida para hacer sus necesidades. Es un momento clave para el equilibrio físico y emocional del perro. Por eso, ofrecemos un servicio de paseos profesionales que se adapta al carácter, la edad y la energía de cada animal.
      </p>
      <p>
        Alternamos rutas, introducimos juegos y fomentamos la socialización en entornos naturales o urbanos, según cada caso.
      </p>
      <p>
        Ofrecemos paseos individuales o grupales, por franjas horarias, con recogida y entrega en domicilio si así lo deseas. Una opción ideal para perros con exceso de energía, dueños con poco tiempo o mascotas que necesitan una rutina estable.
      </p>
      <p class="paseos-contact">
        ¿Quieres mejorar el día a día de tu compañero? <RouterLink to="/contact" style="color: inherit; text-decoration: none;">
        <strong>Contáctanos</strong></RouterLink> y te informaremos de disponibilidad y tarifas.
      </p>
    </div>
  </section>
</template>

<style scoped>
.paseos-hero {
  margin-top: 0;
  background: url('/src/assets/paseos2.jpg') center center / cover no-repeat;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.paseos-hero__overlay {
  margin-top: 100px;
  margin-right: 80px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1.5rem;
  text-align: center;
  border-radius: 8px;
  max-width: 450px;
}

.paseos-hero__title {
  margin: 0;
  color: #fff;
  font-size: 3rem;
  line-height: 1.2;
}

.paseos-hero__subtitle {
  margin-top: 1rem;
  color: #ddd;
  font-size: 1.25rem;
}

.paseos-info-section {
  background-color: #fafafa;
  padding: 4rem 1.5rem;
}

.paseos-info-container {
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.3rem;
  line-height: 2;
  color: #333;
  background-color: #fff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.paseos-title {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #c62828;
  font-weight: bold;
  text-align: center;
}

.paseos-contact {
  font-weight: 600;
  margin-top: 2rem;
  font-size: 1.4rem;
  text-align: center;
}
</style>