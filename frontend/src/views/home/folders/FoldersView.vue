<script setup>
import Folder from "@/components/Folder.vue";

const props = defineProps({
  folders: {
    type: Array,
    default: () => []
  }
});

defineEmits(["reload"]);

</script>

<template>
  <TransitionGroup
    name="list"
    tag="div"
    class="folders-container"
  >
    <div
      v-for="folder in props.folders"
      :key="folder.id"
    >
      <Folder
        :folder="folder"
        @open-folder-modal="showViewFolderModal = true"
        @click="$router.push({ name: 'folder.passwords', params: { id: folder.id }})"
      />
    </div>
  </TransitionGroup>
</template>

<style scoped>
.folders-container {
  display: grid;
  grid-template-columns: 100%;
  gap: var(--gap-4);
  position: relative;
}

@media (min-width: 1024px) {
  .folders-container {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-auto-rows: 80px;
  }
}
</style>