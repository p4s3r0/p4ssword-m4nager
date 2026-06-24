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
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
  position: relative;
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