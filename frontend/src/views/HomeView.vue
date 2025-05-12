<template>
  <section class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Cartelera</h1>
    <div v-if="loading" class="text-center">Cargando películas…</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="grid md:grid-cols-3 gap-6">
      <router-link
        v-for="p in peliculas"
        :key="p.id"
        :to="`/pelicula/${p.id}`"
        class="block border rounded shadow hover:shadow-lg transition"
      >
        <img v-if="p.posterUrl" :src="p.posterUrl" :alt="p.titulo" class="w-full h-48 object-cover rounded-t" />
        <div class="p-4">
          <h2 class="font-semibold text-lg">{{ p.titulo }}</h2>
          <p class="text-sm text-gray-500">{{ p.año }}</p>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { listarPeliculas } from '../services/cartelera';

const peliculas = ref([]);
const loading   = ref(true);
const error     = ref(null);

onMounted(async () => {
  try {
    const { data } = await listarPeliculas();
    peliculas.value = data;
  } catch (err) {
    error.value = err.response?.data?.error || 'Error al cargar la cartelera';
  } finally {
    loading.value = false;
  }
});
</script>
