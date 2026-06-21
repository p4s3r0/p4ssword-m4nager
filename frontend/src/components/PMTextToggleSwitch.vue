<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  }
});

const model = defineModel({ type: Boolean, default: false });

const toggle = () => {
  model.value = !model.value;
};
</script>

<template>
  <div
    class="pm-text-toggle-switch"
    @click="toggle"
  >
    <div
      class="icon-container left"
      :class="{ 'active': !model }"
    >
      <i class="pi pi-times-circle" />
    </div>
    <div class="text-container">
      {{ props.text }}
    </div>
    <div
      class="icon-container right"
      :class="{ 'active': model }"
    >
      <i class="pi pi-check" />
    </div>
  </div>
</template>

<style scoped>
.pm-text-toggle-switch {
  display: flex;
  align-items: center;
  background-color: var(--surface-100);
  border-radius: 9999px;
  padding: 8px;
  cursor: pointer;
  user-select: none;
  gap: var(--gap-2);
  border: 1px solid var(--surface-200);
  width: 100%;
}

.text-container {
  flex: 1;
  text-align: center;
  color: var(--surface-900);
  font-weight: 500;
}

.icon-container {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: transparent;
  color: var(--surface-900);
}

.icon-container.active {
  background-color: var(--surface-900);
  color: var(--surface-0);
  transform: scale(1.1);
}

.icon-container.left:not(.active) {
    color: var(--surface-200);
}

.icon-container.right:not(.active) {
    color: var(--surface-200);
}
</style>
