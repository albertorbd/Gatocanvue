import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'


import App from './App.vue'
import router from './router'





import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives  from 'vuetify/directives'

import '@/assets/main.css'

import { library, dom } from '@fortawesome/fontawesome-svg-core';   
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';   
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'; 

import { faSignInAlt, faUserPlus, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';  
import { useAuthStore } from './stores/auth'


library.add(faSignInAlt, faUserPlus, faUser,faPencilAlt,faShoppingCart );
dom.watch();



const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createPinia())

const authStore = useAuthStore();
const vuetify = createVuetify({
    components,
    directives,
  })

authStore.initialize();

app.use(vuetify);

app.use(router)

app.mount('#app')
