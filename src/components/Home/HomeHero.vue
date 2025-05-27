<template>
  <section class="home-hero">
    <div class="home-hero__overlay">
      <h1 class="home-hero__title">Solo lo mejor para tu mejor amigo</h1>
      <p class="home-hero__subtitle">
        En Gatocan de Alberto descubrirás los mejores productos y servicios para tu mascota
      </p>
      <v-btn class="home-hero_btn" to="/products">
        Descúbrelos
      </v-btn>
    </div>
  </section>
</template>

<style>
  .home-hero_btn {
    margin-top: 1rem;
    padding-top: 10px;
    padding-bottom: 35px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 16px !important;
    font-weight: 600;
    border-radius: 500px;          
    text-transform: none;         
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background-color: #ff4d4d !important;
    color: #fff !important;
    
  }
</style>