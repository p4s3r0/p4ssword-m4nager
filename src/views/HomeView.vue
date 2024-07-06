<template>
    <div id="mainLogin">
        <h1 id="posHello">Hello, {{ this.user.username }} 👋</h1>
        <button id="menuButton" class="ripple" @click="this.showMenuModal=true">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
        </button>
        <search-bar id="posSearchBar" @valueUpdated=search />
        <div class="showFoldersOrPasswords">

            <div>
                <div id="addIcon" class="selectorIcon" @click="addNew">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                </div>
            </div>
            <div style="display: flex;">
                <div class="selectorIcon" id="folderIcon" @click="activateFoldersButton" :class="this.fold_pass_selector == 'Folders' ? 'IconActive' : 'IconNotActive'">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/>
                    </svg>
                </div>


                <div class="selectorIcon" id="passwordIcon" @click="activatePasswordsButton" :class="this.fold_pass_selector == 'Passwords' ? 'IconActive' : 'IconNotActive'">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z"/>
                    </svg>
                </div>

                <div class="selectorIcon" id="twoFaIcon" @click="activateTwoFAButton" :class="this.fold_pass_selector == 'twoFA' ? 'IconActive' : 'IconNotActive'">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M634-320q-14 0-24-10t-10-24v-132q0-14 10-24t24-10h6v-40q0-33 23.5-56.5T720-640q33 0 56.5 23.5T800-560v40h6q14 0 24 10t10 24v132q0 14-10 24t-24 10H634Zm46-200h80v-40q0-17-11.5-28.5T720-600q-17 0-28.5 11.5T680-560v40ZM280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v160h-80v-40H280v480h400v-40h80v160q0 33-23.5 56.5T680-40H280Zm0-120v40h400v-40H280Zm0-640h400v-40H280v40Zm0 0v-40 40Zm0 640v40-40Z"/>
                    </svg>
                </div>
            </div>

  
        </div>
        

        <div id="wrapperl">
            <div class="loader" v-if="this.loading">

            </div>
            <div v-if="this.fold_pass_selector == 'Folders'" id="posFolders">
                        <folder v-for="f in this.folders" @click="openFolder(f.id, f.folder, f.color, f.starred)"
                                                        :key=f.key 
                                                        :name=f.folder
                                                        :color=f.color
                                                        :id=f.id 
                                                        :starred=f.starred 
                                                        :pass_amount="f.pass_amount "/>
            </div>

            <div v-else-if="this.fold_pass_selector=='Passwords'" id="posFolders">
                <password v-for="p in this.passwords"
                                                    :key=p.key 
                                                    :name=p.name
                                                    :enc_password=p.password
                                                    :username=p.username 
                                                    :id=p.id 
                                                    :folder=p.folder 
                                                    :note=p.note 
                                                    :starred=p.starred />
            </div>


            <div v-else id="posFolders">
                <two-f-a v-for="t in this.twoFactors"    
                                                :key="t.key"
                                                :name="t.name"
                                                :secret="t.secret" 
                                                :id="t.id" />
            </div>
        </div>
    
    <upload-file-modal v-if="this.showUploadFileModal" @closeModal="this.showUploadFileModal=false"/>
    <menu-modal v-if="this.showMenuModal"
                @closeModal="this.showMenuModal=false"
                @logoutClick="logout()"
                @downloadClick="download()"
                @uploadClick="this.showMenuModal=false;this.showUploadFileModal=true"/>
    </div>   
</template>
  
<script>
import SearchBar from '@/components/SearchBar.vue';
import FoldersPasswordFilter from '@/components/FoldersPasswordFilter.vue';
import AddButton from '@/components/AddButton.vue';
import Folder from '@/components/Folder.vue';
import Password from '@/components/Password.vue';
import TwoFA from '@/components/TwoFA.vue';

import UploadFileModal from '@/modals/UploadFileModal.vue';
import MenuModal from '@/modals/MenuModal.vue';



import { DBL_logoutUser, settings_getFolderOrPassword, settings_updateFolderOrPassword, getCurrentUser, DBL_getPasswords } from '@/dexie';
import { rankFoldersBySearch, rankPasswordsBySearch, rankPasswordsAlphabetically, rankFolderAlphabetically } from '@/scripts/search';
import { store, DECRYPT } from '@/store/store'

import { DB_getAllPasswords, DB_getAllFolders, DB_getAll2FA, DB_logoutUser } from '@/db'

import { useToast } from "vue-toastification";
import { toasts_config_error, toasts_config_success } from '@/toasts';

export default {
name: 'App',
components: {
    SearchBar,
    FoldersPasswordFilter,
    AddButton,
    Folder,
    Password,
    TwoFA,
    UploadFileModal,
    MenuModal
},
setup() {
      const toast = useToast();
      return { toast }
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
        showMenuModal: false
    }
},
methods: {
    activateFoldersButton() {
        this.fold_pass_selector = "Folders";
        settings_updateFolderOrPassword("Folders")
    },
    activatePasswordsButton() {
        this.fold_pass_selector = "Passwords";
        settings_updateFolderOrPassword("Passwords")
    },
    activateTwoFAButton() {
        this.fold_pass_selector = "twoFA";
        settings_updateFolderOrPassword("twoFA")

    },
    logout() {
        DBL_logoutUser().then( () => {
            this.$router.push('/');
        })
        DB_logoutUser()
    },
    openFolder(folder_id, folder_name, folder_color, folder_starred) {
        store.temp.curr_folder_id = folder_id;        
        store.temp.curr_folder_name = folder_name;        
        store.temp.curr_folder_color = folder_color;     
        store.temp.curr_folder_starred = folder_starred;
        this.$router.push('/folder');
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
    addNew() {
        if (!navigator.onLine) {
            this.toast.error("No internet Connection!", toasts_config_error);
            return;
        }
        setTimeout(() => this.$router.push('/addPasswordOrFolder'), 300);
    },
    async download() {
        const passwords = await DBL_getPasswords();

        let str = '{\n\t"data": ['
        for(let i = 0; i < passwords.length; i++) {
            str += '\n{\n'
            str = str + '\t"name": "' + (passwords[i].name).replace('"', '\"') + '",\n';
            str = str + '\t"username": "' + (await DECRYPT(passwords[i].username)).replace('"', '\"') + '",\n';
            str = str + '\t"password": "' + (await DECRYPT(passwords[i].password)).replace('"', '\"') + '",\n';
            str = str + '\t"folder": "' + (passwords[i].folder).replace('"', '\"') + '",\n';
            str = str + '\t"note": "' + (await DECRYPT(passwords[i].note)).replace('"', '\"') + '",\n';
            str = str + '\t"idx": "' + passwords[i].idx + '",\n';
            str = str + '\t"starred": "' + passwords[i].starred + '"\n';
            str += "},"
        }
        str += "\n]}"


        const blob = new Blob([str], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "passwords.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
    async upload() {

    }
}, beforeMount() {
    getCurrentUser().then( (user) => {
        if(user) {
            this.user = user
            DB_getAllPasswords().then( (res) => {
                this.passwords = rankPasswordsAlphabetically(res);
                // folders are loaded after passwords, to make sure the 
                //count is correct of the passwords inside the folder
                DB_getAllFolders(this.passwords).then( (res_fold) => {
                    this.folders = rankFolderAlphabetically(res_fold);
                    this.loading = false;
                });
            });
            DB_getAll2FA().then( (res) => {
                this.twoFactors = res;
            });
            settings_getFolderOrPassword().then( (res) => {
                this.fold_pass_selector = res;
            })
        } else {
            this.$router.push('/');
        }
    })
}
}
</script>

<style scoped>
#mainLogin {
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
    margin-right: 20px
}

.IconActive {
    border-bottom: 1px solid white;
}

#addIcon {
    justify-content: left;
    margin-left: 20px;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}


/* HTML: <div class="loader"></div> */
.loader {
    margin-left: 50%;
    margin-top: 100px;
    transform: translateX(-50%);
    width: 20%;
    aspect-ratio: 1;
    --_g: no-repeat radial-gradient(farthest-side,#fff 90%,#fff0);
    background: var(--_g), var(--_g), var(--_g), var(--_g);
    background-size: 40% 40%;
    animation: l46 1s infinite;
}
@keyframes l46 {
  0%  {background-position: 0 0      ,100% 0,100% 100%,0 100%}
  40%,
  50% {background-position: 100% 100%,100% 0,0    0   ,0 100%}
  90%,
  100%{background-position: 100% 100%,0 100%,0    0   ,100% 0}
}
</style>
