<template>
  <section class="p-6 max-w-3xl mx-auto">
    <router-link to="/" class="text-blue-500 mb-4 inline-block">← Volver</router-link>

    <div v-if="loading">Cargando…</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <article v-else class="flex flex-col md:flex-row gap-6">
      <img
        v-if="pelicula.posterUrl"
        :src="pelicula.posterUrl"
        :alt="pelicula.titulo"
        class="w-full md:w-64 rounded shadow"
      />

      <div>
        <h1 class="text-2xl font-bold mb-2">{{ pelicula.titulo }}</h1>
        <p class="mb-4">{{ pelicula.descripcion }}</p>
        <p class="text-gray-500 mb-6">Año: {{ pelicula.año }}</p>

        <router-link
          :to="`/reserva/${pelicula.id}`"
          class="bg-green-600 text-white px-4 py-2 rounded"
        >
          Reservar entradas
        </router-link>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { obtenerPelicula } from '../services/cartelera';

const route      = useRoute();
const pelicula   = ref({});
const loading    = ref(true);
const error      = ref(null);

onMounted(async () => {
  try {
    const { data } = await obtenerPelicula(route.params.id);
    pelicula.value = data;
  } catch (err) {
    error.value = err.response?.data?.error || 'Error al cargar la película';
  } finally {
    loading.value = false;
  }
});
</script>
