<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  optionLabel: {
    type: String,
    default: undefined
  },
  optionValue: {
    type: String,
    default: undefined
  },
  placeholder: {
    type: String,
    default: undefined
  },
  required: {
    type: Boolean,
    default: false
  }
});

const model = defineModel({ type: [String, Number, Object], default: "" });
</script>

<template>
  <Select
    v-model="model"
    :options="props.options"
    :option-label="props.optionLabel"
    :option-value="props.optionValue"
    :placeholder="props.placeholder"
    :class="{ 'p-invalid': props.required && !model }"
  />
</template>

<style scoped>
</style>