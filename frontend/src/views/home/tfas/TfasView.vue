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
  <div class="tfas-container">
    <div
      v-for="tfa in props.tfas"
      :key="tfa.key"
    >
      <tfa
        :tfa="tfa"
        @reload="emit('reload')"
      />
    </div>
  </div>
</template>

<style scoped>
.tfas-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
}
</style>