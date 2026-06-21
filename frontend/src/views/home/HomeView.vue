<script setup>
import SearchBar from "@/components/SearchBar.vue";
import Folder from "@/components/Folder.vue";
import TwoFaOTPModal from "@/modals/TwoFaOTPModal.vue";
import UploadFileModal from "@/modals/UploadFileModal.vue";
import MenuModal from "@/modals/MenuModal.vue";
import ViewPasswordModal from "@/modals/ViewPasswordModal.vue";
import TwoFAModal from "@/modals/TwoFAModal.vue";
import AddModal from "@/modals/AddModal.vue";
import SessionModal from "@/modals/SessionModal.vue";
import { useToast } from "vue-toastification";
import {
  rankFoldersBySearch,
  rankPasswordsBySearch,
  rankPasswordsAlphabetically,
  rankFolderAlphabetically,
} from "@/scripts/search";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { download } from "@/helper/transfer_data";
import { useUserStore } from "@/store/userStore";
import API from "@/plugins/axios";
import { useTempStore } from "@/store/tempStore";
import Header from "@/views/home/_components/Header.vue";
import Navigation from "@/views/home/_components/Navigation.vue";

const router = useRouter();
const route = useRoute();

const fold_pass_selector = ref(route.name);
const folders = ref([]);
const passwords = ref([]);
const twoFactors = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const allFolders = ref([]);
const allPasswords = ref([]);

const userStore = useUserStore();

function logout() {
  API.delete("users/sign_out").then(() => {
    userStore.removeUser();
    router.push({ name: "login" });
  });
}


function search() {
  if (fold_pass_selector.value === "Folders") {
    rankFoldersBySearch([...allFolders.value], searchQuery.value).then((res) => {
      folders.value = res;
    });
  } else {
    rankPasswordsBySearch([...allPasswords.value], searchQuery.value).then((res) => {
      passwords.value = res;
    });
  }
}

async function reloadData() {
  const passwordsApi = await API.get("passwords");
  allPasswords.value = rankPasswordsAlphabetically(passwordsApi.data);
  passwords.value = [...allPasswords.value];

  const foldersApi = await API.get("folders");
  allFolders.value = rankFolderAlphabetically(foldersApi.data);
  folders.value = [...allFolders.value];

  const twoFactorsApi = await API.get("tfas");
  twoFactors.value = twoFactorsApi.data;

  loading.value = false;
  if (searchQuery.value) {
    search();
  }
}

reloadData();
</script>

<template>
  <div class="home-view-container">
    <Header />
    <div class="search-bar-container">
      <search-bar
        v-model="searchQuery"
        @value-updated="search"
      />
    </div>

    <div class="show-folders-or-passwords">
      <Navigation
        v-model="fold_pass_selector"
        @reload="reloadData"
      />
    </div>

    <div class="sub-view-container">
      <router-view
        :passwords="passwords"
        :folders="folders"
        :tfas="twoFactors"
        @reload="reloadData"
      />
    </div>
  </div>
</template>

<style scoped>

.home-view-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-5);
  padding: var(--gap-3);
  margin-top: 50px;

  .search-bar-container {
    display: flex;
    justify-content: center;
  }

  #wrapperl {
    max-width: 700px;
    margin-left: 50%;
    transform: translateX(-50%);
    width: 100%;
    margin-top: -10px;
  }

  #posHello {
    position: relative;
    margin-left: 5%;
  }

  #menuButton {
    position: absolute;
    top: 50px;
    right: 20px;
    background-color: var(--surface-0);
    border: none;
    cursor: pointer;
  }

  .show-folders-or-passwords {
    display: flex;
    width: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
    max-width: 650px;
    justify-content: space-between;

  }

  #posFolders {
    margin-top: 40px;
    width: 90%;
    max-width: 1000px;
  }

  #rightTopButton {
    display: flex;
    justify-content: right;
  }

  .selectorIcon {
    cursor: pointer;
    margin-right: 20px;
  }

  .IconActive {
    border-bottom: 1px solid white;
  }

  #addIcon {
    justify-content: left;
    margin-left: 20px;
  }



  /* HTML: <div class="loader"></div> */
  .loader {
    width: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 0 0 #fff4;
    animation: l2 1.5s infinite linear;
    position: relative;
    margin-left: 48%;
    margin-top: 200px;
  }
  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 0 0 0 #fff4;
    animation: inherit;
    animation-delay: -0.5s;
  }
  .loader:after {
    animation-delay: -1s;
  }
  @keyframes l2 {
    100% {box-shadow: 0 0 0 40px #fff0}
  }

  /* LOADER ENDE */

  .leftIcon {
    margin-left: 15px;
  }
}


</style>
