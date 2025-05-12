<template>
  <router-view/>
</template>

<script>
import { onMounted } from 'vue';
import { useAuth } from './store/auth';

export default {
  setup() {
    onMounted(async () => {
      try {
        await useAuth().initAuth();
      } catch (err) {
        console.warn('Auth init falló (ignorado en dev):', err);
      }
    });
  },
};
</script>
