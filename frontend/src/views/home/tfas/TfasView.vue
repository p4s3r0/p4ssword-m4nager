<script setup>

import Tfa from "@/components/Tfa.vue";

const props = defineProps({
  tfas: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["reload"]);
</script>

<template>
  <TransitionGroup
    name="list"
    tag="div"
    class="tfas-container"
  >
    <div
      v-for="tfa in props.tfas"
      :key="tfa.name"
    >
      <tfa
        :tfa="tfa"
        @reload="emit('reload')"
      />
    </div>
  </TransitionGroup>
</template>

<style scoped>
.tfas-container {
  display: grid;
  grid-template-columns: 100%;
  gap: var(--gap-4);
  position: relative;
}

@media (min-width: 1024px) {
  .tfas-container {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>