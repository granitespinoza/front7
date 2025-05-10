<template>
  <section class="p-6 max-w-md mx-auto">
    <router-link to="/" class="text-blue-500 mb-4 inline-block">← Volver</router-link>

    <h1 class="text-2xl font-bold mb-4">Confirmar reserva</h1>

    <div v-if="!user" class="text-red-500 mb-4">
      Debes iniciar sesión para reservar.
    </div>

    <form v-else @submit.prevent="handleReserva" class="space-y-4">
      <label class="block">
        Cantidad de butacas
        <input v-model.number="butacas" type="number" min="1" class="input w-full" required />
      </label>

      <button class="btn bg-green-600 text-white w-full" :disabled="loading">
        <span v-if="loading">Reservando…</span>
        <span v-else>Reservar</span>
      </button>

      <p v-if="error" class="text-red-500">{{ error }}</p>
      <p v-if="success" class="text-green-600">{{ success }}</p>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '../store/auth';
import { crearReserva } from '../services/reservas';

const route   = useRoute();
const { state: auth } = useAuth();

const user     = auth.user;
const peliculaId = Number(route.params.id);

const butacas  = ref(1);
const loading  = ref(false);
const error    = ref('');
const success  = ref('');

async function handleReserva() {
  loading.value = true;
  error.value   = '';
  success.value = '';

  try {
    await crearReserva({
      user_id: user.id,
      funcion_id: peliculaId,
      cantidad_boletos: butacas.value // ejemplo de precio fijo
    });
    success.value = '¡Reserva creada con éxito!';
  } catch (err) {
    error.value = err.response?.data?.error || 'Error al crear la reserva';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.input { @apply border p-2 rounded; }
.btn   { @apply py-2 rounded; }
</style>
