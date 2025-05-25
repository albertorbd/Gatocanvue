<template>
  <section class="veterinary-hero">
    <div class="veterinary-hero__overlay">
      <h1 class="veterinary-hero__title">Servicio Veterinario</h1>
      <p class="veterinary-hero__subtitle">
        La salud de tu mascota es nuestra prioridad.
      </p>
    </div>
  </section>

  <section class="veterinary-info-section">
    <div class="veterinary-info-container">
      <h2 class="veterinary-title">¿Qué incluye nuestro servicio veterinario?</h2>
      <p>
        En <strong>Gatocan de Alberto</strong> contamos con un equipo veterinario cualificado que ofrece atención médica integral para tu mascota. Desde revisiones rutinarias hasta tratamientos especializados. Nuestro objetivo es asegurar el bienestar de tu animal en todas las etapas de su vida.
      </p>
      <p>
        Ofrecemos servicios como vacunas, desparasitaciones, chequeos generales, análisis clínicos, curas, cirugía menor y asesoramiento nutricional. Atendemos tanto casos preventivos como urgencias, adaptándonos a las necesidades de tu mascota.
      </p>
      <p>
        Nuestro enfoque se basa en la prevención, el diagnóstico temprano y la comunicación constante con nuestros clientes. Trabajamos para que cada visita sea una experiencia tranquila y sin estrés para tu compañero peludo.
      </p>
      <p class="veterinary-contact">
        ¿Quieres pedir una cita o más información? <RouterLink to="/contact" style="color: inherit; text-decoration: none;">
        <strong>Contáctanos</strong></RouterLink> y estaremos encantados de ayudarte.
      </p>
    </div>
  </section>
</template>

<style scoped>
.veterinary-hero {
  margin-top: 0;
  background: url('/src/assets/veterinario2.jpg') center center / cover no-repeat;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.veterinary-hero__overlay {
  margin-top: 100px;
  margin-right: 80px;
  background-color: rgba(44, 42, 42, 0.4);
  padding: 1.5rem;
  text-align: center;
  border-radius: 8px;
  max-width: 470px;
}

.veterinary-hero__title {
  margin: 0;
  color: #fff;
  font-size: 3rem;
  line-height: 1.2;
}

.veterinary-hero__subtitle {
  margin-top: 1rem;
  color: #ddd;
  font-size: 1.25rem;
}


.veterinary-info-section {
  background-color: #fafafa;
  padding: 4rem 1.5rem;
}

.veterinary-info-container {
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

.veterinary-title {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #c62828;
  font-weight: bold;
  text-align: center;
}

.veterinary-contact {
  font-weight: 600;
  margin-top: 2rem;
  font-size: 1.4rem;
  text-align: center;
}
</style>