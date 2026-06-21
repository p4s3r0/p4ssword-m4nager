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
      />
      <label :for="props.name">{{ props.label }}</label>
    </FloatLabel>
  </div>
</template>

<style scoped>
.text-input-container {
  width: 100%;
}

:deep(.p-password),
:deep(.p-password-input) {
  width: 100%;
}
</style>