<template>
  <section class="max-w-sm mx-auto py-10">
    <h1 class="text-2xl font-bold mb-6 text-center">Registro</h1>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <input v-model="form.username" type="text"     placeholder="Usuario"    class="input" required />
      <input v-model="form.email"    type="email"    placeholder="Correo"     class="input" required />
      <input v-model="form.password" type="password" placeholder="Contraseña" class="input" required />
      <input v-model="form.dni"      type="text"     placeholder="DNI"        class="input" required />

      <button :disabled="auth.state.loading" class="btn w-full">
        <span v-if="auth.state.loading">Creando…</span>
        <span v-else>Crear cuenta</span>
      </button>

      <p v-if="auth.state.error" class="text-red-500 text-sm">{{ auth.state.error }}</p>
    </form>

    <router-link to="/login" class="block mt-6 text-center text-blue-500">
      ¿Ya tienes cuenta? Inicia sesión
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
  username: '',
  email: '',
  password: '',
  dni: '',
});

async function handleRegister() {
  await auth.register(form);
  if (auth.state.user) router.push('/');
}
</script>

<style scoped>
.input { @apply w-full border p-2 rounded; }
.btn   { @apply bg-green-600 text-white py-2 rounded; }
</style>
