<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import API from "@/plugins/axios";
import Password from "@/components/Password.vue";
import PMIconButton from "@/components/PMIconButton.vue";
import { useDialog } from "primevue";
import DeleteConfirmationDialog from "@/dialogs/DeleteConfirmationDialog.vue";
import { DIALOG_DEFAULT_PROPS } from "@/helper/constants";
import EditFolderDialog from "@/views/home/folders/folder/_dialogs/EditFolderDialog.vue";

import PasswordDialog from "@/views/home/passwords/_dialogs/PasswordDialog.vue";

const route = useRoute();
const router = useRouter();
const dialog = useDialog();
const passwords = ref({ loading: true, entries: [] });
const folder = ref({ loading: true, object: {} });

API.get(`folders/${route.params.id}`).then((response) => {
  folder.value.object = response.data.folder;
  folder.value.loading = false;
});

API.get(`folders/${route.params.id}/passwords`).then((response) => {
  passwords.value.entries = response.data;
  passwords.value.loading = false;
});

function deleteFolder() {
  dialog.open(DeleteConfirmationDialog, {
    props: {
      ...DIALOG_DEFAULT_PROPS,
      header: "Delete folder?"
    },
    data: {
      description: "Are you sure you want to delete this folder? This action cannot be undone. All the passwords in this folder will be moved to the default folder.",
    },
    onClose: (data) => {
      if (data?.data?.confirmed) {
        API.delete(`folders/${route.params.id}`).then(() => {
          router.push({ name: 'home.folders' });
        });
      }
    }
  });
}

function openPasswordDialog(password) {
  dialog.open(PasswordDialog, {
    props: {
      ...DIALOG_DEFAULT_PROPS,
      header: "Password"
    },
    data: {
      password: password
    },
    onClose: (data) => {
      if (data?.data?.reload) {
        reloadData();
      }
    }
  });
}

function reloadData() {
  API.get(`folders/${route.params.id}/passwords`).then((response) => {
    passwords.value.entries = response.data;
    passwords.value.loading = false;
  });
}
</script>

<template>
  <div class="folder-view">
    <div class="header">
      <h1>{{ folder?.object?.name }}</h1>
      <div class="actions">
        <PMIconButton
          icon="pi-trash"
          severity="delete"
          @click="deleteFolder()"
        />
        <PMIconButton
          icon="pi-pencil"
          @click="editFolder()"
        />
        <PMIconButton
          icon="pi-arrow-left"
          @click="$router.back()"
        />
      </div>
    </div>

    <TransitionGroup
      name="list"
      tag="div"
      class="passwords-container"
    >
      <div
        v-for="password in passwords.entries"
        :key="password.id"
      >
        <password
          :password="password"
          @click="openPasswordDialog(password)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.folder-view {
  padding: var(--gap-3);
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: var(--gap-6);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .actions {
      display: flex;
      gap: var(--gap-1);
    }
  }

  .passwords-container {
    display: flex;
    flex-direction: column;
    gap: var(--gap-3);
    width: 100%;
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
}
</style>