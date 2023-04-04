// bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  store  from './store';
import mitt from 'mitt';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const emitter = mitt();
const app = createApp(App)

app.config.globalProperties.emitter = emitter;
app.use(router)
app.use(store)
app.use(VueSweetalert2);

app.mount('#app')
