<template>
<footer class="site-footer">
  <div class="footer__top container">
    <div class="footer__about">
      <img src="/src/assets/logo.png" alt="GatocandeAlberto" class="footer__logo" />
      <p class="footer__text">
        Tu mejor amigo es nuestra máxima prioridad. Encuentra los mejores productos y servicios para tu mascota.
      </p>
    </div>

    <nav class="footer__nav">
      <h4 class="footer__title">Enlaces útiles</h4>
      <ul class="footer__list">
        <li><a href="/products">Productos</a></li>
        <li><a href="/about-us">Sobre Nosotros</a></li>
        <li><a href="/contact">Contáctanos</a></li>

      </ul>
    </nav>

    <div class="footer__contact">
      <h4 class="footer__title">Contáctanos</h4>
      <p>C. de Florentino Ballesteros, 15, 50002 Zaragoza</p>
      <p><a href="mailto:info@gatocandealberto.com">info@gatocandealberto.com</a></p>
      <p>976 59 67 60</p>
    </div>
  </div>

  <div class="footer__bottom container">
    <div class="footer__legal">
      <p>© <span id="current-year">2025</span> GatocandeAlberto. Todos los derechos reservados.</p>
      <a href="/privacy">Política de privacidad</a> | <a href="/terms">Términos de uso</a>
    </div>
  </div>
</footer>
</template>
<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooterComp',
  
})
  
</script>
<style>

.site-footer {
  background: #1f2937;
  color: #f1f5f9;
  font-size: 0.9rem;
  line-height: 1.5;
}

.site-footer .container {
  max-width: 1500px;      
  margin: 0 auto;         
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;          
}



.footer__about,
.footer__nav,
.footer__contact {
  flex: 1;
  min-width: 200px;
}

.footer__nav{
  text-align: center;
}

.footer__logo {
  max-width: 200px;
}

.footer__title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 20px;
}

.footer__contact p{
  font-size: 16px;
  padding-bottom: 3px;
}
.footer__text {
  margin: 0;
  font-size: 18px;
}

.footer__list {
  list-style: none;
  padding: 0;
}

.footer__list li + li {
  margin-top: 0.5rem;
}

.footer__list a,
.footer__contact a,
.footer__legal a {
  color: #f1f5f9;
  text-decoration: none;
  transition: color 0.2s;
}

.footer__list a:hover,
.footer__contact a:hover,
.footer__legal a:hover {
  color: #3b82f6;
}

.footer__bottom {
  border-top: 1px solid #334155;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  width: 100%;
}



.footer__legal {
  font-size: 15px;
  text-align: center;
  padding-top: 8px;

}

.footer__legal p {
  margin: 0;
  font-size: 18px;
}


</style>