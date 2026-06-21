<script setup>
import Password from "@/components/Password.vue";

const props = defineProps({
  passwords: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div
    v-for="password in props.passwords"
    :key="password.key"
  >
    <password
      :password="password"
      @open-password-modal="showViewPasswordModal = true"
    />
  </div>
</template>

<style scoped>

</style>