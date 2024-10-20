<template>
    <div id="mainLogin">
        <h1 @click="this.toast.info('HI')" id="posHello">Hello, {{ this.user.username }} 👋</h1>
        <button id="menuButton" class="ripple" @click="this.showMenuModal = true">
            <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
        </button>
        <search-bar id="posSearchBar" @valueUpdated="search" />
        <div class="showFoldersOrPasswords">
            <symbol-icon icon="add" 
                            class="selectorIcon leftIcon"
                            @click="this.showAddModal = true;" />

            <div style="display: flex">
                <symbol-icon icon="folder" 
                            class="selectorIcon"
                            :class="this.fold_pass_selector == 'Folders' ? 'IconActive' : 'IconNotActive'"
                            @click="activateFoldersButton" />


                <symbol-icon icon="password"
                            class="selectorIcon"
                            :class="this.fold_pass_selector == 'Passwords' ? 'IconActive' : 'IconNotActive'"
                            @click="activatePasswordsButton" />


                <symbol-icon icon="2fa"
                            class="selectorIcon"
                            :class="this.fold_pass_selector == 'twoFA' ? 'IconActive' : 'IconNotActive'"
                            @click="activateTwoFAButton" />
            </div>
        </div>



        <div id="wrapperl">
            <Transition name="fade" mode="out-in">
                <div v-if="this.loading">
                    <div class="loader"></div>
                </div>
                <div v-else>
                    <div v-if="this.fold_pass_selector == 'Folders'" id="posFolders">
                        <folder
                            v-for="f in this.folders"
                            @click="openFolder(f.id, f.folder, f.color, f.starred)"
                            :key="f.key"
                            :name="f.folder"
                            :color="f.color"
                            :id="f.id"
                            :starred="f.starred"
                            :pass_amount="f.pass_amount"
                        />
                    </div>

                    <div v-else-if="this.fold_pass_selector == 'Passwords'" id="posFolders">
                        <password
                            v-for="p in this.passwords"
                            @openPasswordModal="this.showViewPasswordModal = true"
                            :key="p.key"
                            :name="p.name"
                            :enc_password="p.password"
                            :username="p.username"
                            :id="p.id"
                            :folder="p.folder"
                            :note="p.note"
                            :starred="p.starred"
                        />
                    </div>

                    <div v-else id="posFolders">
                        <two-f-a v-for="t in this.twoFactors" 
                            @open2FA="this.showTwoFaModal=true"
                            @openTwoFaOTPModal="openTwoFaOTPModalFunction"
                            :key="t.key" 
                            :name="t.name" 
                            :secret="t.secret" 
                            :id="t.id"
                             />
                    </div>
                </div>
            </Transition>
        </div>



        <Transition name="bounce" mode="out-in">
            <upload-file-modal
                v-if="this.showUploadFileModal"
                @closeModal=" this.showUploadFileModal = false; resetScrolling();" />
        </Transition>

        <Transition name="bounce" mode="out-in">
            <menu-modal
                v-if="this.showMenuModal"
                @closeModal="this.showMenuModal = false; resetScrolling();"
                @logoutClick="logout()"
                @downloadClick="download()"
                @uploadClick="this.showMenuModal = false; this.showUploadFileModal = true;" />
        </Transition>

        <Transition name="bounce" mode="out-in">
            <view-password-modal
                v-if="this.showViewPasswordModal"
                @closeModal="this.showViewPasswordModal = false; resetScrolling();"
                @closeModalReload="this.showViewPasswordModal = false; resetScrolling(); reloadData();" />
        </Transition>

        <Transition name="bounce" mode="out-in">
            <two-f-a-modal v-if="this.showTwoFaModal"
                @closeModal="this.showTwoFaModal = false; resetScrolling();"
                @closeModalReload="this.showTwoFaModal = false; resetScrolling(); reloadData()" />
        </Transition>

        <Transition name="bounce" mode="out-in">
            <TwoFaOTPModal v-if="this.showTwoFaOtpModal"
                :OTPcode="this.twoFaOtpCode"
                @closeModal="this.showTwoFaOtpModal = false; resetScrolling();"/>
        </Transition>

        <add-modal v-if="this.showAddModal"
            @closeModal="this.showAddModal=false; resetScrolling();"
            @closeModalReload="this.showAddModal=false; resetScrolling(); reloadData()" />
    </div>
</template>

<script>
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

import SymbolIcon from "@/components/SymbolIcon.vue";

import { useToast } from "vue-toastification";


import {
    DBL_logoutUser,
    settings_getFolderOrPassword,
    settings_updateFolderOrPassword,
    getCurrentUser,
    DBL_getPasswords,
} from "@/dexie";
import {
    rankFoldersBySearch,
    rankPasswordsBySearch,
    rankPasswordsAlphabetically,
    rankFolderAlphabetically,
} from "@/scripts/search";
import { store, DECRYPT } from "@/store/store";

import { DB_getAllPasswords, DB_getAllFolders, DB_getAll2FA, DB_logoutUser } from "@/db";

export default {
    name: "App",
    setup() {
      const toast = useToast();
      return { toast }
    },
    components: {
        SearchBar,
        Folder,
        Password,
        TwoFA,
        SymbolIcon,
        UploadFileModal,
        MenuModal,
        ViewPasswordModal,
        TwoFAModal,
        AddModal,
        TwoFaOTPModal
    },
    data() {
        return {
            user: {},
            fold_pass_selector: "Folders",
            folders: [],
            passwords: [],
            twoFactors: [],
            new_app_version: "",
            loading: true,
            showUploadFileModal: false,
            showMenuModal: false,
            showViewPasswordModal: false,
            showTwoFaModal: false,
            showAddModal: false,
            showTwoFaOtpModal: false,
            twoFaOtpCode: 0
        };
    },
    methods: {
        openTwoFaOTPModalFunction(code) {
            this.twoFaOtpCode = code;
            this.showTwoFaOtpModal = true;
        },
        activateFoldersButton() {
            this.fold_pass_selector = "Folders";
            settings_updateFolderOrPassword("Folders");
        },
        activatePasswordsButton() {
            this.fold_pass_selector = "Passwords";
            settings_updateFolderOrPassword("Passwords");
        },
        activateTwoFAButton() {
            this.fold_pass_selector = "twoFA";
            settings_updateFolderOrPassword("twoFA");
        },
        logout() {
            DBL_logoutUser().then(() => {
                this.$router.push("/");
            });
            DB_logoutUser();
        },
        openFolder(folder_id, folder_name, folder_color, folder_starred) {
            store.temp.curr_folder_id = folder_id;
            store.temp.curr_folder_name = folder_name;
            store.temp.curr_folder_color = folder_color;
            store.temp.curr_folder_starred = folder_starred;
            this.$router.push("/folder");
        },
        search(keyword) {
            if (this.fold_pass_selector == "Folders") {
                rankFoldersBySearch(keyword).then((res) => {
                    this.folders = res;
                });
            } else {
                rankPasswordsBySearch(keyword).then((res) => {
                    this.passwords = res;
                });
            }
        },
        async download() {
            const passwords = await DBL_getPasswords();

            let str = '{\n\t"data": [';
            for (let i = 0; i < passwords.length; i++) {
                str += "\n{\n";
                str = str + '\t"name": "' + passwords[i].name.replace('"', '"') + '",\n';
                str = str + '\t"username": "' + (await DECRYPT(passwords[i].username)).replace('"', '"') + '",\n';
                str = str + '\t"password": "' + (await DECRYPT(passwords[i].password)).replace('"', '"') + '",\n';
                str = str + '\t"folder": "' + passwords[i].folder.replace('"', '"') + '",\n';
                str = str + '\t"note": "' + (await DECRYPT(passwords[i].note)).replace('"', '"') + '",\n';
                str = str + '\t"idx": "' + passwords[i].idx + '",\n';
                str = str + '\t"starred": "' + passwords[i].starred + '"\n';
                str += "},";
            }
            str += "\n]}";

            const blob = new Blob([str], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "passwords.json";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        resetScrolling() {
            document.body.style.overflow = "";
        },
        reloadFolders() {
            DB_getAllFolders(this.passwords).then((res_fold) => {
                this.folders = rankFolderAlphabetically(res_fold);
                this.loading = false;
            });
        },
        reloadData() {
            getCurrentUser().then((user) => {
            if (user) {
                this.user = user;
                DB_getAllPasswords().then((res) => {
                    this.passwords = rankPasswordsAlphabetically(res);
                    // folders are loaded after passwords, to make sure the
                    //count is correct of the passwords inside the folder
                    DB_getAllFolders(this.passwords).then((res_fold) => {
                        this.folders = rankFolderAlphabetically(res_fold);
                        this.loading = false;
                    });
                });
                DB_getAll2FA().then((res) => {
                    this.twoFactors = res;
                });
                settings_getFolderOrPassword().then((res) => {
                    this.fold_pass_selector = res;
                });
            } else {
                this.$router.push("/");
            }
        });
        }
    },
    beforeMount() {
        document.body.style.overflow = "";
        this.reloadData();
    },
};
</script>

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
    margin-top: -10px;
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
    align-items: right;
    justify-content: space-between;
}

#posFolders {
    margin-top: 40px;
    width: 90%;
    max-width: 1000px;
}

#rightTopButton {
    display: flex;
    align-items: bottom;
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
