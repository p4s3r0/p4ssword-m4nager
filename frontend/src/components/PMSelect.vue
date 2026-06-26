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

const model = defineModel({ type: [String, Number, Object], default: "" });
</script>

<template>
  <div class="pm-select-container">
    <FloatLabel
      v-if="props.label"
      variant="on"
    >
      <Select
        v-model="model"
        :options="props.options"
        :option-label="props.optionLabel"
        :option-value="props.optionValue"
        :placeholder="props.placeholder"
        :class="{ 'p-invalid': props.required && props.submitted && !model }"
      />
      <label>
        {{ props.label }}
        <span
          v-if="props.required"
          class="required"
          :class="{ 'invalid': props.submitted && !model }"
        >*</span>
      </label>
    </FloatLabel>
    <Select
      v-else
      v-model="model"
      :options="props.options"
      :option-label="props.optionLabel"
      :option-value="props.optionValue"
      :placeholder="props.placeholder"
      :class="{ 'p-invalid': props.required && props.submitted && !model }"
    />
  </div>
</template>

<style scoped>
.pm-select-container {
  width: 100%;

  .required {
    color: var(--surface-900);

    &.invalid {
      color: var(--color-red);
    }
  }
}
</style>