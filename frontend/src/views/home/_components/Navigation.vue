<script setup>
import { useRoute, useRouter } from 'vue-router';
import PMIconButton from "@/components/PMIconButton.vue";
import PMSelectButton from "@/components/PMSelectButton.vue";
import { useDialog } from "primevue";
import AddDialog from "@/views/home/_dialogs/AddDialog/AddDialog.vue";
import { DIALOG_DEFAULT_PROPS } from "@/helper/constants";

const dialog = useDialog();
const router = useRouter();
const route = useRoute();

const model = defineModel({ type: String, default: "" });

const options = [
  { value: 'home.folders', icon: 'pi-folder' },
  { value: 'home.passwords', icon: 'pi-key' },
  { value: 'home.tfa', icon: 'pi-ticket' }
];

function onOptionChange(value) {
  router.push({ name: value });
}

function showAddDialog() {
  dialog.open(AddDialog, {
    props: DIALOG_DEFAULT_PROPS
  });
}
</script>

<template>
  <div class="navigation">
    <PMIconButton
      icon="pi-plus-circle"
      @click="showAddDialog()"
    />

    <PMSelectButton
      v-model="model"
      :options="options"
      option-value="value"
      @update:model-value="onOptionChange"
    />
  </div>
</template>

<style scoped>
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>