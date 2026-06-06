<script setup>
import { store } from "@/store/store";
import { DB_deleteFolder, DB_getPasswordsForSpecificFolder, } from "@/db";
import { rankPasswordsAlphabetically } from "@/scripts/search";
import { useToast } from "vue-toastification";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Password from "@/components/Password.vue";
import HomeButton from "@/components/HomeButton.vue";
import ViewPasswordModal from "@/modals/ViewPasswordModal.vue";
import EditFolderModal from "@/modals/EditFolderModal.vue";
import DeleteConfirmationModal from "@/modals/DeleteConfirmationModal.vue";

const toast = useToast();
const router = useRouter();
const folder = ref(store.temp.curr_folder_name);
const folder_id = ref(store.temp.curr_folder_id);
const passwords = ref([]);
const showViewPasswordModal = ref(false);
const showEditModal = ref(false);
const showConfirmationModal = ref(false);

reloadData();

function deleteFolder() {
  DB_deleteFolder(folder_id.value).then((res) => {
    if (res === 0) {
      toast.success("Folder deleted!");
      router.push("/home");
    } else if (res === -1) {
      toast.error("Invalid Parameters!");
    } else if (res === -2) {
      toast.error("Not authorized, API key invalid!");
    } else if (res === -3) {
      toast.error("Internal API Error!");
    } else {
      toast.error("API Error!");
    }
  });
}

function resetScrolling() {
  document.body.style.overflow = "";
}

function reloadData() {
  DB_getPasswordsForSpecificFolder(store.temp.curr_folder_name).then((res) => {
    if (res) {
      passwords.value = rankPasswordsAlphabetically(res);
      return;
    } else if (res === -1) {
      toast.error("Invalid Parameters!");
    } else if (res === -2) {
      toast.error("Invalid API key!");
    } else if (res === -3) {
      toast.error("Internal API Error!");
    } else {
      toast.error("API Error!");
    }
    router.push("/home");
  });
}
</script>

<template>
  <div id="mainLogin">
    <h1>{{ folder }}</h1>
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
          @click="showEditModal = true"
        />
      </div>
    </div>

    <div id="wrapperl">
      <div id="posPasswords">
        <password
          v-for="p in passwords"
          :id="p.id"
          :key="p.key"
          :name="p.name"
          :enc-password="p.password"
          :username="p.username"
          :folder="p.folder"
          :note="p.note"
          :starred="p.starred"
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
