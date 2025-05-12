<template>
  <section
    style="padding:1rem; max-width:400px; margin:2rem auto; background:#121212; color:#fff; border-radius:8px;"
  >
    <h1 style="text-align:center; margin-bottom:1.5rem;">✍️ Regístrate</h1>

    <form @submit.prevent="onSubmit" novalidate>
      <div style="margin-bottom:1rem;">
        <label for="username" style="display:block; margin-bottom:0.3rem;">Usuario</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          required
          placeholder="Tu nombre de usuario"
          style="width:100%; padding:0.5rem; border-radius:4px; border:1px solid #555; background:#222; color:#fff;"
        />
      </div>

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
          placeholder="Mínimo 6 caracteres"
          style="width:100%; padding:0.5rem; border-radius:4px; border:1px solid #555; background:#222; color:#fff;"
        />
      </div>

      <div style="margin-bottom:1rem;">
        <label for="dni" style="display:block; margin-bottom:0.3rem;">DNI</label>
        <input
          id="dni"
          v-model="form.dni"
          type="text"
          required
          maxlength="8"
          placeholder="8 dígitos"
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
        {{ loading ? 'Registrando…' : 'Registrar' }}
      </button>
    </form>

    <p style="margin-top:1rem; text-align:center; font-size:0.9rem;">
      ¿Ya tienes cuenta?
      <router-link to="/login" style="color:#61dafb; text-decoration:none;">
        Inicia sesión aquí
      </router-link>
    </p>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { registrar as apiRegister } from '../services/usuarios';

const router = useRouter();
const form = reactive({ username: '', email: '', password: '', dni: '' });
const loading = ref(false);
const error = ref(null);

async function onSubmit() {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await apiRegister({
      username: form.username,
      email: form.email,
      password: form.password,
      dni: form.dni,
    });
    // opcional: guardar usuario o token
    // redirigir al login o a home:
    router.push('/login');
  } catch (err) {
    error.value = err.response?.data?.error || 'Error al registrar';
  } finally {
    loading.value = false;
  }
}
</script>
