<script setup>
const props = defineProps({
  label: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  }
});

const model = defineModel({ type: String, default: "" });
</script>

<template>
  <FloatLabel variant="on">
    <TextArea
      :id="props.name"
      v-model="model"
      rows="2"
      style="resize: none"
    />
    <label :for="props.name">{{ props.label }}</label>
  </FloatLabel>
</template>

<style scoped>
label {
  top: 50% !important;
  transform: translateY(-50%) !important;
}

.p-floatlabel-on:has(textarea:focus) label,
.p-floatlabel-on:has(textarea.p-filled) label {
  top: 0 !important;
  transform: translateY(-50%) scale(0.75) !important;
}
</style>