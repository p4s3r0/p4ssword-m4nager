<script setup>
import { computed } from "vue";
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
    return model.value ? model.value.replace("#", "") : "000000";
  },
  set: (val) => {
    model.value = `#${val}`;
  }
});
</script>

<template>
  <div class="pm-color-picker">
    <div class="color-picker-container">
      <ColorPicker
        v-model="colorValue"
        class="color-picker"
      />
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

    .color-picker {
      input {
        width: 56px !important;
        height: 56px !important;
        flex-shrink: 0;
      }
    }

    .color-input {
      flex-grow: 1;
    }
  }
}
</style>
