// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import HomeView    from '../views/HomeView.vue';
import MovieView   from '../views/MovieView.vue';
import LoginView   from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ReservaView from '../views/ReservaView.vue';
import MisReservas from '../views/MisReservas.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/pelicula/:id',
    name: 'Movie',
    component: MovieView,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/reserva/:id',
    name: 'Reserva',
    component: ReservaView,
    props: true
  },
  {
    path: '/mis-reservas',
    name: 'MisReservas',
    component: MisReservas
  },
  // Este catch-all redirige cualquier ruta desconocida al Home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
