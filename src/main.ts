import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

// 1. Importa el core y el componente Vue
import { library, dom } from '@fortawesome/fontawesome-svg-core';   // :contentReference[oaicite:5]{index=5}
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';    // :contentReference[oaicite:6]{index=6}

// 2. Importa los iconos que vas a usar
import { faSignInAlt, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';  // :contentReference[oaicite:7]{index=7}

// 3. Añade los iconos a la librería
library.add(faSignInAlt, faUserPlus, faUser);

// 4. Opcional: mantiene actualizados los iconos añadidos 
dom.watch();


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia())
app.use(router)

app.mount('#app')
