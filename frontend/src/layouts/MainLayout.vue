<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/userStore";
import Sidebar from "@/views/home/_components/Sidebar.vue";
import Header from "@/views/home/_components/Header.vue";

const userStore = useUserStore();
const route = useRoute();
const isMobile = ref(window.innerWidth < 1024);
const foldPassSelector = ref(route.name);

function updateWidth() {
  isMobile.value = window.innerWidth < 1024;
}

watch(() => route.name, (newName) => {
  foldPassSelector.value = newName;
});

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<template>
  <div
    v-if="userStore.isLoggedIn"
    class="main-layout"
    :class="{ 'desktop-layout': !isMobile }"
  >
    <Sidebar
      v-if="!isMobile"
      v-model="foldPassSelector"
    />

    <div class="main-content">
      <Header v-if="isMobile" />
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
  <router-view v-else />
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: all 0.3s ease;

  &.desktop-layout {
    flex-direction: row;
    background-color: var(--surface-0);

    .main-content {
      flex: 1;
      padding: var(--gap-8) var(--gap-10);
      overflow-y: auto;
      max-height: 100vh;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
