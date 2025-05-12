<!-- src/views/MovieView.vue -->
<template>
  <section
    style="padding:1rem; max-width:600px; margin:0 auto; background:#121212; color:#fff; min-height:100vh;"
  >
    <button
      @click="router.back()"
      style="margin-bottom:1rem; background:none; border:none; color:#61dafb; cursor:pointer;"
    >
      ← Volver
    </button>

    <div v-if="loading" style="font-size:1.2rem;">🔄 Cargando detalle…</div>
    <div v-else-if="error" style="color:tomato; font-size:1.2rem;">
      ❌ {{ error }}
    </div>
    <div v-else>
      <h1 style="font-size:2rem; margin-bottom:0.5rem;">🎬 {{ pelicula.titulo }}</h1>
      <p style="margin-bottom:0.5rem;">
        <strong>Duración:</strong> {{ pelicula.duracion }} min
      </p>
      <p style="margin-bottom:1rem;">{{ pelicula.descripcion }}</p>
      <button
        @click="irAReserva"
        style="
          padding:0.6rem 1.2rem;
          background:#61dafb;
          color:#000;
          border:none;
          border-radius:4px;
          cursor:pointer;
          font-size:1rem;
        "
      >
        Reservar entradas
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { obtenerPelicula } from '../services/cartelera';

const route = useRoute();
const router = useRouter();

const pelicula = ref({});
const loading  = ref(true);
const error    = ref(null);

async function fetchDetalle() {
  try {
    const res = await obtenerPelicula(route.params.id);
    // Si mock devuelve strings, conviértelo así:
    res.data.id = Number(res.data.id);
    pelicula.value = res.data;
  } catch (err) {
    error.value =
      err.response?.data?.detail ||
      `${err.response?.status} ${err.response?.statusText}` ||
      err.message;
  } finally {
    loading.value = false;
  }
}

function irAReserva() {
  router.push(`/reserva/${pelicula.value.id}`);
}

onMounted(fetchDetalle);
</script>
