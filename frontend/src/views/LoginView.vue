<!-- src/views/LoginView.vue -->
<template>
  <section
    style="padding:1rem; max-width:400px; margin:2rem auto; background:#121212; color:#fff; border-radius:8px;"
  >
    <h1 style="text-align:center; margin-bottom:1.5rem;">🔐 Iniciar sesión</h1>

    <form @submit.prevent="onSubmit" novalidate>
      <div style="margin-bottom:1rem;">
        <label for="email" style="display:block; margin-bottom:0.3rem;">Correo electrónico</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="ejemplo@dominio.com"
          style="width:100%; padding:0.5rem; border-radius:4px; border:1px solid #555; background:#222; color:#fff;"
        />
      </div>

      <div style="margin-bottom:1rem;">
        <label for="password" style="display:block; margin-bottom:0.3rem;">Contraseña</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="••••••••"
          style="width:100%; padding:0.5rem; border-radius:4px; border:1px solid #555; background:#222; color:#fff;"
        />
      </div>

      <div v-if="error" style="margin-bottom:1rem; color:tomato; text-align:center;">
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="loading"
        style="
          width:100%;
          padding:0.7rem;
          background:#61dafb;
          color:#000;
          border:none;
          border-radius:4px;
          cursor:pointer;
          font-size:1rem;
        "
      >
        {{ loading ? 'Ingresando…' : 'Entrar' }}
      </button>
    </form>

    <p style="margin-top:1rem; text-align:center; font-size:0.9rem;">
      ¿No tienes cuenta?
      <router-link to="/register" style="color:#61dafb; text-decoration:none;">
        Regístrate aquí
      </router-link>
    </p>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../store/auth';

const router = useRouter();
const auth = useAuth();

const form = reactive({
  email: '',
  password: ''
});

const loading = ref(false);
const error = ref(null);

async function onSubmit() {
  loading.value = true;
  error.value = null;
  try {
    await auth.login({
      email: form.email,
      password: form.password
    });
    router.push('/');
  } catch (err) {
    error.value = err.response?.data?.error || err.message || 'Error al iniciar sesión';
  } finally {
    loading.value = false;
  }
}
</script>
