<script setup>
</script>

<template>
  <router-view v-slot=" { Component }">
    <transition
      name="fade"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </router-view>
  <DynamicDialog />
</template>

<style>
html {
  background-color: var(--surface-0);
  color: var(--surface-900);
  margin: 0;
}

body {
  margin: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

</style>
