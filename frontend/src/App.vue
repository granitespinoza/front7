<template>
  <router-view />
</template>

<script>
import { onMounted } from 'vue';
import { useAuth } from './store/auth';
export default {
  setup() {
    onMounted(() => {
      useAuth().initAuth();
    });
  },
};
</script>
