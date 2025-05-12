<template>
  <section
    style="padding:2rem; max-width:400px; margin:0 auto; background:#121212; color:#fff; min-height:100vh;"
  >
    <button @click="router.back()" 
            style="background:none; border:none; color:#61dafb; cursor:pointer; margin-bottom:1rem;">
      ← Volver
    </button>

    <!-- 1) Usuario no autenticado -->
    <div v-if="!auth.isAuthenticated" style="text-align:center;">
      <p style="color:tomato; margin-bottom:1rem;">
        ❌ Debes iniciar sesión para reservar.
      </p>
      <router-link to="/login"
                   style="padding:0.5rem 1rem; background:#61dafb; color:#000; border-radius:4px; text-decoration:none;">
        Ir a Login
      </router-link>
    </div>

    <!-- 2) Formulario de reserva -->
    <div v-else>
      <h2 style="margin-bottom:1rem;">
        Reservar entradas para: {{ pelicula.titulo }}
      </h2>

      <label>
        Cantidad de boletos:
        <input v-model.number="cantidad" type="number" min="1" style="width:100%; padding:0.5rem; margin:0.5rem 0;" />
      </label>

      <button @click="confirmar" 
              :disabled="submitting"
              style="padding:0.6rem 1.2rem; background:#61dafb; color:#000; border:none; border-radius:4px; cursor:pointer;">
        {{ submitting ? 'Enviando…' : 'Confirmar reserva' }}
      </button>

      <p v-if="message" :style="{ color: messageError ? 'tomato' : 'lightgreen', marginTop: '1rem' }">
        {{ message }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '../store/auth';
import { obtenerPelicula } from '../services/cartelera';
import { crearReserva } from '../services/reservas';

const route  = useRoute();
const router = useRouter();
const auth   = useAuth();

const pelicula  = ref({});
const cantidad  = ref(1);
const submitting= ref(false);
const message   = ref('');
const messageError = ref(false);

// 1) Cargar detalle de la película (para mostrar el título)
onMounted(async () => {
  try {
    const res = await obtenerPelicula(route.params.id);
    pelicula.value = res.data;
  } catch {
    // ignoramos, ya lo viste en MovieView
  }
});

// 2) Función que envía la reserva
async function confirmar() {
  message.value = '';
  messageError.value = false;
  submitting.value = true;

  try {
    const payload = {
      user_id: auth.user.id,
      funcion_id: pelicula.value.id,
      cantidad_boletos: cantidad.value
    };
    await crearReserva(payload);
    message.value = '✅ Reserva creada con éxito';
  } catch (err) {
    messageError.value = true;
    message.value = '❌ Error creando reserva';
  } finally {
    submitting.value = false;
  }
}
</script>
