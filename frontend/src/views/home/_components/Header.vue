<script setup>
import PMIconButton from "@/components/PMIconButton.vue";
import { useUserStore } from "@/store/userStore";
import { useDialog } from "primevue";
import { DIALOG_DEFAULT_PROPS } from "@/helper/constants";
import ProfileDialog from "@/views/home/_dialogs/ProfileDialog.vue";

const userStore = useUserStore();
const dialog = useDialog();

function openProfileDialog() {
  dialog.open(ProfileDialog, {
    props: {
      ...DIALOG_DEFAULT_PROPS,
      header: "Profile"
    }
  });
}
</script>

<template>
  <div class="home-header">
    <h1>Hello, {{ userStore.username }} ✋🏼</h1>
    <PMIconButton
      id="menuButton"
      icon="pi-bars"
      class="ripple"
      @click="openProfileDialog()"
    />
  </div>
</template>

<style scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>