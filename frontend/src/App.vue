<script setup>
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();
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
  <Toast>
    <template #container="{ message, closeCallback }">
      <div class="toast-container">
        <div class="type-indicator" />
        {{ message.detail }}
      </div>
      <i
        class="pi pi-times close-icon"
        @click="closeCallback"
      />
    </template>
  </Toast>
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
