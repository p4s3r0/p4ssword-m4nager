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
    <p
      class="text"
      :style="`--tag-color: ${props.color};`"
    >
      {{ props.text }}
    </p>
  </div>
</template>

<style scoped>
.tag {
  background-color: #f0f0f0;
  padding: 0 var(--gap-2);
  border-radius: 999px;
  width: fit-content;

  .text {
    font-size: 0.8rem;
    color: color-mix(in srgb, white 90%, var(--tag-color) 20%);
    margin: 0;
  }
}
</style>