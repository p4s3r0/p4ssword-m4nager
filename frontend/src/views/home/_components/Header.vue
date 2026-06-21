<script setup>
import PMIconButton from "@/components/PMIconButton.vue";
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();
</script>

<template>
  <div class="home-header">
    <h1>Hello, {{ userStore.username }} ✋🏼</h1>
    <PMIconButton
      id="menuButton"
      icon="pi-bars"
      class="ripple"
      @click="showMenuModal = true"
    />
  </div>
</template>

<style scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>