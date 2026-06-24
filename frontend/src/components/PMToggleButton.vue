<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "pi-star"
  }
});

const model = defineModel({ type: Boolean, default: false });
</script>

<template>
  <div
    class="toggle-button"
    :class="{ 'toggle-active': model}"
    @click="model=!model"
  >
    <i :class="`pi ${props.icon}`" />
  </div>
</template>

<style scoped>
.toggle-button {
  border: 1px dashed var(--surface-700);
  padding: var(--gap-2);
  border-radius: 99999px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.toggle-active {
    background-color: var(--surface-900);
    color: var(--surface-0);
  }
}
</style>