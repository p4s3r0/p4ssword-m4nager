<script setup>
const props = defineProps({
  text: {
    type: String,
    default: undefined
  },
  color: {
    type: String,
    default: "transparent"
  }
});
</script>

<template>
  <div
    class="tag"
    :style="`background-color: ${props.color};`"
  >
    <p class="text">
      {{ props.text }}
    </p>
  </div>
</template>

<style scoped>
.tag {
  background-color: #f0f0f0;
  padding: 0 var(--gap-2);
  border-radius: 999px;
  .text {
    font-size: 0.8rem;
    color: var(--surface-200);
    margin: 0;
  }
}
</style>