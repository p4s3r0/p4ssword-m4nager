<script setup>
const props = defineProps({
  label: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  required: {
    type: Boolean,
    default: false
  },
  submitted: {
    type: Boolean,
    default: false
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
      :class="{ 'p-invalid': props.required && props.submitted && !model }"
    />
    <label :for="props.name">
      {{ props.label }}
      <span
        v-if="props.required"
        class="required"
        :class="{ 'invalid': props.submitted && !model }"
      >*</span>
    </label>
  </FloatLabel>
</template>

<style scoped>
.required {
  color: var(--surface-900);

  &.invalid {
    color: var(--color-red);
  }
}

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