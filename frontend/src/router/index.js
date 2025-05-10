import { createRouter, createWebHistory } from 'vue-router';

const HomeView      = () => import('../views/HomeView.vue');
const MovieView     = () => import('../views/MovieView.vue');
const LoginView     = () => import('../views/LoginView.vue');
const RegisterView  = () => import('../views/RegisterView.vue');
const ReservaView   = () => import('../views/ReservaView.vue');
const MisReservas   = () => import('../views/MisReservas.vue');

const routes = [
  { path: '/',             component: HomeView },
  { path: '/pelicula/:id', component: MovieView,      props: true },
  { path: '/login',        component: LoginView },
  { path: '/register',     component: RegisterView },
  { path: '/reserva/:id',  component: ReservaView,    props: true },
  { path: '/mis-reservas', component: MisReservas },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
