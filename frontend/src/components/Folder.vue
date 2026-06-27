<script setup>
const props = defineProps({
  folder: {
    type: Object,
    default: () => {}
  }
});
</script>

<template>
  <div class="folder-container ripple">
    <div class="left-container">
      <div
        class="folder-color"
        :style="`background-color: ${props.folder.color}`"
      />
      <p class="folder-name">
        {{ props.folder.name }}
      </p>
    </div>
    <p class="amount">
      {{ props.folder.passwords_count }}
    </p>
  </div>
</template>

<style scoped>
.folder-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: var(--surface-900);
  border-radius: var(--border-radius-4);
  background-color: var(--surface-100);
  padding: var(--gap-4) calc(var(--gap-4) + 2px) var(--gap-4) var(--gap-4);
  border: 1px solid var(--surface-200);
  height: 80px;
  transition: all 0.2s ease;

  @media (hover: hover) {
    &:hover {
      transform: scale(0.99);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border-color: var(--surface-300);
    }
  }

  &:active {
    transform: scale(0.98);
  }

  .left-container {
    display: flex;
    align-items: center;
    gap: var(--gap-4);
    height: 100%;

    .folder-color {
      width: var(--gap-2);
      height: 100%;
      border-radius: 999px;
    }

    .folder-name {
      font-size: 1.2em;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--surface-900);
    }
  }

  .amount {
    color: var(--surface-200);
  }
}
</style>
  