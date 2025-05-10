import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { worker } from './mocks/browser';
import './styles/style.css';

if (import.meta.env.DEV) worker.start();

createApp(App).use(router).mount('#app');
