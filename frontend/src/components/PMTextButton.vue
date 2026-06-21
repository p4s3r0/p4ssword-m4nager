<script setup>
const props = defineProps({
  text: {
    type: String,
    default: undefined
  },
  severity: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'delete'].includes(value)
  }
});
</script>

<template>
  <Button
    :label="props.text"
    :class="`severity-${props.severity}`"
  />
</template>

<style scoped>

</style>