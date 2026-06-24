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
  }
});

const model = defineModel({ type: String, default: "" });
</script>

<template>
  <div class="text-input-container">
    <FloatLabel variant="on">
      <Password
        :id="props.name"
        v-model="model"
        :placeholder="props.placeholder"
        :feedback="false"
        toggle-mask
        :class="{ 'p-invalid': props.required && !model }"
      />
      <label :for="props.name">
        {{ props.label }}
        <span
          v-if="props.required"
          class="required"
        >*</span>
      </label>
    </FloatLabel>
  </div>
</template>

<style scoped>
.text-input-container {
  width: 100%;

  .required {
    color: var(--color-red);
  }
}
</style>