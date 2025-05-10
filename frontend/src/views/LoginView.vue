<template>
  <section class="max-w-sm mx-auto py-10">
    <h1 class="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <input v-model="form.email"    type="email"    placeholder="Correo"    class="input" required />
      <input v-model="form.password" type="password" placeholder="Contraseña" class="input" required />

      <button :disabled="auth.state.loading" class="btn w-full">
        <span v-if="auth.state.loading">Entrando…</span>
        <span v-else>Entrar</span>
      </button>

      <p v-if="auth.state.error" class="text-red-500 text-sm">{{ auth.state.error }}</p>
    </form>

    <router-link to="/register" class="block mt-6 text-center text-blue-500">
      ¿No tienes cuenta? Regístrate
    </router-link>
  </section>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../store/auth';

const router = useRouter();
const auth   = useAuth();

const form = reactive({
  email: '',
  password: '',
});

async function handleLogin() {
  await auth.login(form);
  if (auth.state.user) router.push('/');
}
</script>

<style scoped>
.input { @apply w-full border p-2 rounded; }
.btn   { @apply bg-blue-600 text-white py-2 rounded; }
</style>
