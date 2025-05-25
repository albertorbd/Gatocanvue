<template>
  <section class="peluqueria-hero">
    <div class="peluqueria-hero__overlay">
      <h1 class="peluqueria-hero__title">Peluquería canina y gatuna</h1>
      <p class="peluqueria-hero__subtitle">
        Estilo, higiene y bienestar para tu mejor amigo.
      </p>
    </div>
  </section>

  <section class="peluqueria-info-section">
    <div class="peluqueria-info-container">
      <h2 class="peluqueria-title">¿Qué ofrecemos en nuestra peluquería?</h2>
      <p>
        En <strong>Gatocan de Alberto</strong> contamos con un servicio de peluquería canina y gatuna profesional, pensado para que tu mascota no solo luzca bien, sino que también se sienta cómoda y relajada durante todo el proceso. Adaptamos cada sesión según la raza, tipo de pelo y necesidades específicas de tu mascota.
      </p>
      <p>
        Ofrecemos baños higiénicos y terapéuticos, cortes de pelo personalizados, deslanado, cepillado profundo, limpieza de oídos, corte de uñas y tratamientos antiparasitarios. Utilizamos productos naturales y específicos para cada tipo de piel, evitando alergias e irritaciones.
      </p>
      <p>
       Te pedimos el número y te avisaremos media hora antes de que tu mascota esté lista para que tengas tiempo de venir y no sufra mucho la espera.
      </p>
      <p class="peluqueria-contact">
        ¿Quieres agendar una cita o saber más? <RouterLink to="/contact" style="color: inherit; text-decoration: none;">
        <strong>Contáctanos</strong></RouterLink> sin compromiso.
      </p>
    </div>
  </section>
</template>


<style scoped>
.peluqueria-hero {
  margin-top: 0;
 background: url('/src/assets/peluqueria2.jpg') center center / cover no-repeat;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.peluqueria-hero__overlay {
  margin-top: 100px;
  margin-right: 80px;
  background-color: rgba(44, 42, 42, 0.4);
  padding: 1.5rem;
  text-align: center;
  border-radius: 8px;
  max-width: 450px;
}

.peluqueria-hero__title {
  margin: 0;
  color: #fff;
  font-size: 3rem;
  line-height: 1.2;
}

.peluqueria-hero__subtitle {
  margin-top: 1rem;
  color: #ddd;
  font-size: 1.25rem;
}


.peluqueria-info-section {
  background-color: #fafafa;
  padding: 4rem 1.5rem;
}

.peluqueria-info-container {
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

.peluqueria-title {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #c62828;
  font-weight: bold;
  text-align: center;
}

.peluqueria-contact {
  font-weight: 600;
  margin-top: 2rem;
  font-size: 1.4rem;
  text-align: center;
}
</style>