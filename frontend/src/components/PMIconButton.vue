<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: undefined
  },
  text: {
    type: String,
    default: undefined
  },
  severity: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'delete'].includes(value)
  }
});
</script>

<template>
  <Button
    :icon="`pi ${props.icon}`"
    :text="props.text"
    severity="primary"
    :class="`color-${props.severity}`"
  />
</template>

<style scoped>

</style>