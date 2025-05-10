<template>
  <section class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Mis reservas</h1>

    <div v-if="!user" class="text-red-500">
      Debes iniciar sesión para ver tus reservas.
    </div>

    <div v-else>
      <div v-if="loading">Cargando…</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>

      <table v-else class="w-full border">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">Película</th>
            <th class="p-2 border">Butacas</th>
            <th class="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in reservas" :key="r.id">
            <td class="p-2 border">{{ r.peliculaId }}</td>
            <td class="p-2 border">{{ r.butacas }}</td>
            <td class="p-2 border">S/ {{ r.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '../store/auth';
import { listarReservasUsuario } from '../services/reservas';

const { state: auth } = useAuth();
const user = auth.user;

const reservas = ref([]);
const loading  = ref(true);
const error    = ref('');

onMounted(async () => {
  if (!user) return;
  try {
    const { data } = await listarReservasUsuario(user.id);
    reservas.value = data;
  } catch (err) {
    error.value = err.response?.data?.error || 'Error al cargar reservas';
  } finally {
    loading.value = false;
  }
});
</script>
