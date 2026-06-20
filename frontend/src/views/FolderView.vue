<script setup>
import { rankPasswordsAlphabetically } from "@/scripts/search";
import { useToast } from "vue-toastification";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Password from "@/components/Password.vue";
import HomeButton from "@/components/HomeButton.vue";
import ViewPasswordModal from "@/modals/ViewPasswordModal.vue";
import EditFolderModal from "@/modals/EditFolderModal.vue";
import DeleteConfirmationModal from "@/modals/DeleteConfirmationModal.vue";
import API from "@/plugins/axios";
import { useTempStore } from "@/store/tempStore";

const toast = useToast();
const router = useRouter();
const tempStore = useTempStore();

const passwords = ref([]);
const showViewPasswordModal = ref(false);
const showEditModal = ref(false);
const showConfirmationModal = ref(false);

reloadData();

function deleteFolder() {
  API.delete(`folders/${tempStore.folder.id}`).then(() => {
    toast.success("Folder deleted!");
    router.push({ name: "home" });
  });
}

function resetScrolling() {
  document.body.style.overflow = "";
}

function reloadData() {
  API.get(`folders/${tempStore.folder.id}`).then((response) => {
    passwords.value = rankPasswordsAlphabetically(response.data.passwords);
  });
}

function openEditDialog() {
  showEditModal.value = true;
}
</script>

<template>
  <div id="mainLogin">
    <h1>{{ tempStore.folder.name }}</h1>
    <div id="posDelEdit">
      <div id="delEdit">
        <Button
          label="Delete"
          icon="pi pi-trash"
          icon-pos="left"
          severity="danger"
          @click="showConfirmationModal = true"
        />
        <Button
          label="Edit"
          icon="pi pi-pencil"
          icon-pos="left"
          style="margin-left: 5px"
          @click="openEditDialog()"
        />
      </div>
    </div>

    <div id="wrapperl">
      <div id="posPasswords">
        <password
          v-for="p in passwords"
          :key="p.key"
          :password="p"
          @open-password-modal="showViewPasswordModal = true"
        />
      </div>
      <div style="width: 100px; height: 100px" />
    </div>
    <home-button @click="$router.push('/home')" />

    <Transition
      name="bounce"
      mode="out-in"
    >
      <view-password-modal
        v-if="showViewPasswordModal"
        @close-modal="
          showViewPasswordModal = false;
          resetScrolling();
        "
        @close-modal-reload="
          showViewPasswordModal = false;
          resetScrolling();
          reloadData();
        "
      />
    </Transition>
    <Transition
      name="bounce"
      mode="out-in"
    >
      <edit-folder-modal
        v-if="showEditModal"
        @close-modal="
          showEditModal = false;
          resetScrolling();
        "
      />
    </Transition>

    <Transition
      name="bounce"
      mode="out-in"
    >
      <delete-confirmation-modal
        v-if="showConfirmationModal"
        val="folder?"
        @close-modal="
          showConfirmationModal = false;
          resetScrolling();
        "
        @confirmed="
          showConfirmationModal = false;
          deleteFolder();
        "
      />
    </Transition>
  </div>
</template>

<style scoped>
#wrapperl {
  max-width: 700px;
  margin-left: 45%;
  transform: translateX(-50%);
  width: 100%;
}

#delEdit {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 700px;
  width: 100%;
  transform: translateX(-50%);
  margin-left: 50%;
}

#posDelEdit {
  position: relative;
}

h1 {
  margin-left: 8%;
}

#posPasswords {
  margin-top: 40px;
  width: 90%;
  max-width: 1000px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

@media (min-width: 700px) {
  #wrapperl {
    margin-left: 48.5%;
  }
}
</style>
