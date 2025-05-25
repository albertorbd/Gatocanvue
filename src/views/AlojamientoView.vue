<template>
  <section class="alojamiento-hero">
    <div class="alojamiento-hero__overlay">
      <h1 class="alojamiento-hero__title">Alojamiento para Mascotas</h1>
      <p class="alojamiento-hero__subtitle">
        Comodidad, atención y cariño las 24 horas.
      </p>
    </div>
  </section>

  <section class="alojamiento-info-section">
    <div class="alojamiento-info-container">
      <h2 class="alojamiento-title">¿Qué necesitas saber a cerca de nuestro alojamiento?</h2>
      <p>
        En <strong>Gatocan de Alberto</strong> ofrecemos un servicio de alojamiento diseñado para que tu mascota se sienta como en casa. Nuestras instalaciones están pensadas para proporcionar confort, seguridad y un entorno estimulante tanto para estancias cortas como prolongadas.
      </p>
      <p>
        Disponemos de espacios amplios, higienizados y adaptados para todo tipo de perros y gatos. Cada animal cuenta con su propio espacio individual, pero también tiene acceso a zonas comunes para jugar y socializar bajo supervisión profesional. 
      </p>
      <p>
        Nuestro equipo se encarga del cuidado diario, incluyendo paseos, alimentación personalizada, administración de medicación si es necesario, y atención veterinaria en caso de urgencia. Además, mantenemos contacto regular con los dueños para informar sobre el estado y comportamiento de su mascota.
      </p>
      <p class="alojamiento-contact">
        ¿Te vas de viaje o necesitas que cuidemos de tu compañero? <RouterLink to="/contact" style="color: inherit; text-decoration: none;">
        <strong>Contáctanos</strong></RouterLink> y te informaremos de disponibilidad y precios.
      </p>
    </div>
  </section>
</template>

<style scoped>
.alojamiento-hero {
  margin-top: 0;
  background: url('/src/assets/alojamiento2.jpg') center center / cover no-repeat;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.alojamiento-hero__overlay {
  margin-top: 100px;
  margin-right: 80px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1.5rem;
  text-align: center;
  border-radius: 8px;
  max-width: 450px;
}

.alojamiento-hero__title {
  margin: 0;
  color: #fff;
  font-size: 3rem;
  line-height: 1.2;
}

.alojamiento-hero__subtitle {
  margin-top: 1rem;
  color: #ddd;
  font-size: 1.25rem;
}

.alojamiento-info-section {
  background-color: #fafafa;
  padding: 4rem 1.5rem;
}

.alojamiento-info-container {
  max-width: 900px;
  margin: 0 auto;
  font-size: 1.3rem;
  line-height: 1.8;
  color: #333;
  background-color: #fff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.alojamiento-title {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #c62828;
  font-weight: bold;
  text-align: center;
}

.alojamiento-contact {
  font-weight: 600;
  margin-top: 2rem;
  font-size: 1.4rem;
  text-align: center;
}
</style>