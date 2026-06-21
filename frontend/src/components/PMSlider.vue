<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  }
});

const model = defineModel({ type: Number, default: 10 });
</script>

<template>
  <div class="pm-slider">
    <div class="label-container">
      <span class="label">{{ props.label }}</span>
      <span class="value">{{ model }}</span>
    </div>
    <input
      v-model.number="model"
      type="range"
      :min="props.min"
      :max="props.max"
      class="slider"
    >
  </div>
</template>

<style scoped>
.pm-slider {
  display: flex;
  flex-direction: column;
  background-color: var(--surface-100);
  border-radius: 12px;
  padding: 12px 16px;
  gap: var(--gap-2);
  border: 1px solid var(--surface-200);
  width: 100%;
}

.label-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--surface-900);
  font-weight: 500;
}

.value {
  background-color: var(--surface-0);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--surface-900);
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--surface-0);
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--surface-900);
  cursor: pointer;
  border: none;
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--surface-900);
  cursor: pointer;
  border: none;
}
</style>
