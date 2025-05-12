// src/main.js
//import './styles/style.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/style.css';




function bootstrap() {
  const app = createApp(App);
  app.use(router);
  app.mount('#app');
}

if (import.meta.env.DEV) {
  import('./mocks/browser')
    .then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
    .then(bootstrap)
    .catch(() => bootstrap());
} else {
  bootstrap();
}
