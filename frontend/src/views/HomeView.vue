<script setup>
import SearchBar from "@/components/SearchBar.vue";
import Folder from "@/components/Folder.vue";
import Password from "@/components/Password.vue";
import TwoFA from "@/components/TwoFA.vue";
import TwoFaOTPModal from "@/modals/TwoFaOTPModal.vue";
import UploadFileModal from "@/modals/UploadFileModal.vue";
import MenuModal from "@/modals/MenuModal.vue";
import ViewPasswordModal from "@/modals/ViewPasswordModal.vue";
import TwoFAModal from "@/modals/TwoFAModal.vue";
import AddModal from "@/modals/AddModal.vue";
import SessionModal from "@/modals/SessionModal.vue";
import SymbolIcon from "@/components/SymbolIcon.vue";
import { useToast } from "vue-toastification";
import { settings_getFolderOrPassword, settings_updateFolderOrPassword } from "@/dexie";
import {
  rankFoldersBySearch,
  rankPasswordsBySearch,
  rankPasswordsAlphabetically,
  rankFolderAlphabetically,
} from "@/scripts/search";
import { store } from "@/store/store";
import { DB_getAllPasswords, DB_getAllFolders, DB_getAll2FA, DB_logoutUser, DB_checkValidAPIKey } from "@/db";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { download } from "@/helper/transfer_data";
import { useUserStore } from "@/store/userStore";
import API from "@/plugins/axios";

const toast = useToast();
const router = useRouter();

const fold_pass_selector = ref("Folders");
const folders = ref([]);
const passwords = ref([]);
const twoFactors = ref([]);
const loading = ref(true);
const showUploadFileModal = ref(false);
const showMenuModal = ref(false);
const showViewPasswordModal = ref(false);
const showTwoFaModal = ref(false);
const showAddModal = ref(false);
const showTwoFaOtpModal = ref(false);
const showApiModal = ref(false);
const twoFaOtpCode = ref(0);
const searchQuery = ref("");

const userStore = useUserStore();

function openTwoFaOTPModalFunction(code) {
  twoFaOtpCode.value = code;
  showTwoFaOtpModal.value = true;
}

function activateFoldersButton() {
  fold_pass_selector.value = "Folders";
  settings_updateFolderOrPassword("Folders");
}

function activatePasswordsButton() {
  fold_pass_selector.value = "Passwords";
  settings_updateFolderOrPassword("Passwords");
}

function activateTwoFAButton() {
  fold_pass_selector.value = "twoFA";
  settings_updateFolderOrPassword("twoFA");
}

function logout() {
  DB_logoutUser();
}

function openFolder(folder_id, folder_name, folder_color, folder_starred) {
  store.temp.curr_folder_id = folder_id;
  store.temp.curr_folder_name = folder_name;
  store.temp.curr_folder_color = folder_color;
  store.temp.curr_folder_starred = folder_starred;
  router.push("/folder");
}

function search() {
  if (fold_pass_selector.value === "Folders") {
    rankFoldersBySearch(folders.value, searchQuery.value).then((res) => {
      folders.value = res;
    });
  } else {
    rankPasswordsBySearch(passwords.value, searchQuery.value).then((res) => {
      passwords.value = res;
    });
  }
}


function resetScrolling() {
  document.body.style.overflow = "";
}

function reloadFolders() {
  DB_getAllFolders(passwords.value).then((res_fold) => {
    if (res_fold === -1) {
      toast.error("Invalid Parameters!");
    } else if (res_fold === -2) {
      toast.error("Invalid API Key!");
    } else if (res_fold === -99) {
      toast.error("API Error!");
    }
    else if (res_fold) {
      folders.value = rankFolderAlphabetically(res_fold);
    }
    loading.value = false;
  });
}

async function reloadData() {
  const passwordsApi = await API.get("passwords");
  passwords.value = rankPasswordsAlphabetically(passwordsApi.data);

  const foldersApi = await API.get("folders");
  folders.value = rankFolderAlphabetically(foldersApi.data);

  const twoFactorsApi = await API.get("tfas");
  twoFactors.value = twoFactorsApi.data;

  settings_getFolderOrPassword().then((res) => {
    fold_pass_selector.value = res;
  });

  loading.value = false;
}

document.body.style.overflow = "";
reloadData();
</script>

<template>
  <div id="mainLogin">
    <h1 id="posHello">
      Hello, {{ userStore.username }} 👋
    </h1>
    <button
      id="menuButton"
      class="ripple"
      @click="showMenuModal = true"
    >
      <svg
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="white"
      >
        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
      </svg>
    </button>
    <search-bar
      id="posSearchBar"
      v-model="searchQuery"
      @value-updated="search"
    />
    <div class="showFoldersOrPasswords">
      <symbol-icon
        icon="add"
        class="selectorIcon leftIcon"
        @click="showAddModal = true;"
      />

      <div style="display: flex">
        <symbol-icon
          icon="folder"
          class="selectorIcon"
          :class="fold_pass_selector === 'Folders' ? 'IconActive' : 'IconNotActive'"
          @click="activateFoldersButton"
        />


        <symbol-icon
          icon="password"
          class="selectorIcon"
          :class="fold_pass_selector === 'Passwords' ? 'IconActive' : 'IconNotActive'"
          @click="activatePasswordsButton"
        />


        <symbol-icon
          icon="2fa"
          class="selectorIcon"
          :class="fold_pass_selector === 'twoFA' ? 'IconActive' : 'IconNotActive'"
          @click="activateTwoFAButton"
        />
      </div>
    </div>



    <div id="wrapperl">
      <Transition
        name="fade"
        mode="out-in"
      >
        <div v-if="loading">
          <div class="loader" />
        </div>
        <div v-else>
          <div
            v-if="fold_pass_selector === 'Folders'"
            id="posFolders"
          >
            <folder
              v-for="f in folders"
              :id="f.id"
              :key="f.key"
              :name="f.folder"
              :color="f.color"
              :starred="f.starred"
              :pass-amount="f.pass_amount"
              @click="openFolder(f.id, f.folder, f.color, f.starred)"
            />
          </div>

          <div
            v-else-if="fold_pass_selector === 'Passwords'"
            id="posFolders"
          >
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

          <div
            v-else
            id="posFolders"
          >
            <two-f-a
              v-for="t in twoFactors"
              :id="t.id"
              :key="t.key"
              :name="t.name" 
              :secret="t.secret" 
              :algo="t.algo" 
              @open2-f-a="showTwoFaModal=true"
              @open-two-fa-o-t-p-modal="openTwoFaOTPModalFunction"
            />
          </div>
        </div>
      </Transition>
    </div>



    <Transition
      name="bounce"
      mode="out-in"
    >
      <upload-file-modal
        v-if="showUploadFileModal"
        @close-modal=" showUploadFileModal = false; resetScrolling();"
      />
    </Transition>

    <Transition
      name="bounce"
      mode="out-in"
    >
      <menu-modal
        v-if="showMenuModal"
        @close-modal="showMenuModal = false; resetScrolling();"
        @logout-click="logout()"
        @download-click="download(passwords, folders, twoFactors)"
        @upload-click="showMenuModal = false; showUploadFileModal = true;"
        @open-session-modal="showMenuModal = false; showApiModal = true"
      />
    </Transition>

    <Transition
      name="bounce"
      mode="out-in"
    >
      <view-password-modal
        v-if="showViewPasswordModal"
        @close-modal="showViewPasswordModal = false; resetScrolling();"
        @close-modal-reload="showViewPasswordModal = false; resetScrolling(); reloadData();"
      />
    </Transition>

    <Transition
      name="bounce"
      mode="out-in"
    >
      <two-f-a-modal
        v-if="showTwoFaModal"
        @close-modal="showTwoFaModal = false; resetScrolling();"
        @close-modal-reload="showTwoFaModal = false; resetScrolling(); reloadData()"
      />
    </Transition>

    <Transition
      name="bounce"
      mode="out-in"
    >
      <TwoFaOTPModal
        v-if="showTwoFaOtpModal"
        :code="twoFaOtpCode"
        @close-modal="showTwoFaOtpModal = false; resetScrolling();"
      />
    </Transition>

    <Transition
      name="bounce"
      mode="out-in"
    >
      <SessionModal
        v-if="showApiModal"
        @close-modal-reload="showApiModal = false; resetScrolling(); reloadData()"
      />
    </Transition>

    <add-modal
      v-if="showAddModal"
      @close-modal="showAddModal=false; resetScrolling();"
      @close-modal-reload="showAddModal=false; resetScrolling(); reloadData()"
    />
  </div>
</template>

<style scoped>
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
#posSearchBar {
    margin-top: 6vh;
}

#menuButton {
    position: absolute;
    top: 50px;
    right: 20px;
    background-color: var(--background-color);
    border: none;
    cursor: pointer;
}

.showFoldersOrPasswords {
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

</style>
