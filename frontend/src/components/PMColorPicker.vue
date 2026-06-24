<script setup>
import { computed, ref } from "vue";
import PMTextInput from "@/components/PMTextInput.vue";

const props = defineProps({
  label: {
    type: String,
    default: "Color"
  }
});

const model = defineModel({ type: String, default: "#000000" });

const colorValue = computed({
  get: () => {
    return model.value || "#000000";
  },
  set: (val) => {
    model.value = val;
  }
});

const colorPickerInput = ref(null);

function openColorPicker() {
  colorPickerInput.value.click();
}
</script>

<template>
  <div class="pm-color-picker">
    <div class="color-picker-container">
      <div
        class="color-preview"
        :style="{ backgroundColor: colorValue }"
        @click="openColorPicker"
      >
        <input
          ref="colorPickerInput"
          v-model="colorValue"
          type="color"
          class="hidden-color-input"
        >
      </div>
      <PMTextInput
        v-model="model"
        :label="props.label"
        class="color-input"
      />
    </div>
  </div>
</template>

<style scoped>
.pm-color-picker {
  width: 100%;

  .color-picker-container {
    display: flex;
    align-items: center;
    gap: var(--gap-3);

    .color-preview {
      width: 50px;
      height: 50px;
      border-radius: var(--border-radius-2);
      border: 1px solid var(--surface-200);
      cursor: pointer;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;

      .hidden-color-input {
        position: absolute;
        top: -10px;
        left: -10px;
        width: 1px;
        height: 1px;
        opacity: 0;
        pointer-events: none;
      }
    }

    .color-input {
      flex-grow: 1;
    }
  }
}
</style>
