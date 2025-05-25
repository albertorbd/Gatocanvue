<template>
  <section class="training-hero">
    <div class="training-hero__overlay">
      <h1 class="training-hero__title">Adiestramiento Canino</h1>
      <p class="training-hero__subtitle">
        Potencia el vínculo con tu perro gracias a nuestro adiestramiento personalizado.
      </p>
    </div>
  </section>

  <section class="training-info-section">
    <div class="training-info-container">
      <h2 class="training-title">¿En qué consiste nuestro adiestramiento?</h2>
      <p>
        En <strong>Gatocan de Alberto</strong> ofrecemos un servicio de adiestramiento canino totalmente personalizado, enfocado en mejorar la convivencia con tu mascota tanto en casa como a la hora de socializar con otras personas y animales. Nuestro método se basa en el refuerzo positivo y técnicas modernas respetando los tiempos de aprendizaje de cada perro.
      </p>
      <p>
        Trabajamos sobre comportamientos básicos como sentarse, acudir a la llamada, caminar sin tirar de la correa, controlar la ansiedad y socializar correctamente con otros perros y personas. También abordamos problemas específicos de conducta como ladridos excesivos, agresividad, miedos o inseguridad.
      </p>
      <p>
        Cada sesión está dirigida por un profesional con amplia experiencia, y puede realizarse de forma individual o en grupo, tanto en nuestras instalaciones como al aire libre, según tus necesidades.
      </p>
      <p class="training-contact">
        ¿Quieres saber más o pedir presupuesto? <RouterLink to="/contact" style="color: inherit; text-decoration: none;">
        <strong>Contáctanos</strong></RouterLink> y te informaremos sin compromiso.
      </p>
    </div>
  </section>
</template>

<style scoped>
.training-hero {
  margin-top: 0;
  background: url('/src/assets/adiestramiento2.jpg') center center / cover no-repeat;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.training-hero__overlay {
  margin-top: 100px;
  margin-right: 80px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1.5rem;
  text-align: right;
  border-radius: 8px;
  max-width: 450px;
}

.training-hero__title {
  margin: 0;
  color: #fff;
  font-size: 3rem;
  line-height: 1.2;
}

.training-hero__subtitle {
  margin-top: 1rem;
  color: #ddd;
  font-size: 1.25rem;
}


.training-info-section {
  background-color: #fafafa;
  padding: 4rem 1.5rem;
}

.training-info-container {
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

.training-title {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #c62828;
  font-weight: bold;
  text-align: center;
}

.training-contact {
  font-weight: 600;
  margin-top: 2rem;
  font-size: 1.4rem;
  text-align: center;
}
</style>