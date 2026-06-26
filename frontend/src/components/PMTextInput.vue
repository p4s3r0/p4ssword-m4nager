<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: undefined
  },
  label: {
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
  <div class="text-input-container">
    <FloatLabel variant="on">
      <InputText
        :id="props.name"
        v-model="model"
        :placeholder="props.placeholder"
        type="text"
        :class="{ 'p-invalid': props.required && props.submitted && !model}"
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
  </div>
</template>

<style scoped>
.text-input-container {
  width: 100%;

  .required {
    color: var(--surface-900);

    &.invalid {
      color: var(--color-red);
    }
  }
}
</style>