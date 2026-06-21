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
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
  position: relative;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>