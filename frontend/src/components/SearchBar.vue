<script setup>
import PMTextInput from "@/components/PMTextInput.vue";

const model = defineModel({ type: String, default: "" });
const emit = defineEmits(['valueUpdated']);
</script>

<template>
  <div class="search-bar">
    <i class="pi pi-search" />
    <InputText
      v-model="model"
      placeholder="Search"
      @input="emit('valueUpdated', model)"
    />
  </div>
</template>

<style scoped>
.search-bar {
  --search-bar-height: 50px;
  --icon-size: 20px;
  position: relative;
  height: var(--search-bar-height);
  width: 70%;

  i {
    position: absolute;
    top: calc(var(--search-bar-height) / 2 - var(--icon-size) / 2);
    left: var(--gap-4);
    font-size: var(--icon-size) !important;
  }

  .p-inputtext {
    padding-left: calc(var(--gap-4) + var(--icon-size) + var(--gap-4));
  }
}


</style>
