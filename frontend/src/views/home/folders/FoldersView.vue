<script setup>
import Folder from "@/components/Folder.vue";

const props = defineProps({
  folders: {
    type: Array,
    default: () => []
  }
});

</script>

<template>
  <div class="folders-container">
    <div
      v-for="folder in props.folders"
      :key="folder.key"
    >
      <Folder
        :folder="folder"
        @open-folder-modal="showViewFolderModal = true"
        @click="$router.push({ name: 'folder.passwords', params: { id: folder.id }})"
      />
    </div>
  </div>
</template>

<style scoped>
.folders-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-2)
}
</style>