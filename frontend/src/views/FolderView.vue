<template>
	<div id="mainLogin">
		<h1>{{ this.folder }}</h1>
		<div id="posDelEdit">
			<div id="delEdit">
				<Button label="Delete" icon="pi pi-trash" iconPos="left" @click="showConfirmationModal=true" severity="danger"/>
				<Button label="Edit" icon="pi pi-pencil" iconPos="left" @click="showEditModal=true" style="margin-left: 5px;"/>
			</div>
		</div>

		<div id="wrapperl">
			<div id="posPasswords">
				<password v-for="p in this.passwords"
				@openPasswordModal="this.showViewPasswordModal = true"
				:key=p.key
				:name=p.name
				:enc_password=p.password
				:username=p.username
				:id=p.id 
				:folder=p.folder
				:note=p.note 
				:starred=p.starred />
			</div>
			<div style="width: 100px; height: 100px;"></div>
		</div>
		<home-button @click="this.$router.push('/home')" />

		<Transition name="bounce" mode="out-in">
			<view-password-modal
				v-if="this.showViewPasswordModal"
				@closeModal="this.showViewPasswordModal = false; resetScrolling();"
				@closeModalReload="this.showViewPasswordModal = false; resetScrolling(); reloadData();"
					/>
		</Transition>
		<Transition name="bounce" mode="out-in">
			<edit-folder-modal v-if="this.showEditModal"
				@closeModal="
						this.showEditModal = false;
						resetScrolling();
				"/>
		</Transition>

		<Transition name="bounce" mode="out-in">
				<delete-confirmation-modal v-if="this.showConfirmationModal"
					@closeModal="this.showConfirmationModal=false; resetScrolling();" val="folder?" @confirmed="showConfirmationModal=false; deleteFolder()"/>
		</Transition>


	</div>
</template>

<script>
import Password from '@/components/Password.vue'
import SmallButtonDelete from '@/components/SmallButtonDelete.vue'
import SmallButtonEdit from '@/components/SmallButtonEdit.vue'
import HomeButton from '@/components/HomeButton.vue';

import ViewPasswordModal from "@/modals/ViewPasswordModal.vue";
import EditFolderModal from "@/modals/EditFolderModal"
import DeleteConfirmationModal from "@/modals/DeleteConfirmationModal.vue";

import { store } from '@/store/store';
import { getCurrentUser, DBL_logoutUser } from '@/dexie';
import { DB_deleteFolder, DB_getPasswordsForSpecificFolder, DB_checkValidAPIKey } from '@/db'
import { rankPasswordsAlphabetically } from '@/scripts/search'

import { useToast } from "vue-toastification";


export default {
	name: 'App',
	setup() {
			const toast = useToast();
			return { toast }
		},
	components: {
		Password,
		SmallButtonDelete,
		SmallButtonEdit,
		HomeButton,
		ViewPasswordModal,
		DeleteConfirmationModal,
		EditFolderModal,
	},
	data() {
			return {
				user: {},
				folder: store.temp.curr_folder_name,
				folder_id: store.temp.curr_folder_id,
				passwords: [],
				showViewPasswordModal: false,
				showEditModal: false,
				showConfirmationModal: false
			}
	},
	methods: {
		deleteFolder() {
			if (!navigator.onLine) {
				this.toast.error("No internet Connection!");
				return;
			}

			DB_deleteFolder(this.folder_id).then( (res) => {
				if (res === 0) {
					this.toast.success("Folder deleted!");
					this.$router.push('/home');
				} else if (res === -1) {
					this.toast.error("Invalid Parameters!");
				} else if (res === -2) {
					this.toast.error("Not authorized, API key invalid!");
				} else if (res === -3) {
					this.toast.error("Internal API Error!");
				} else {
					this.toast.error("API Error!");
				}
			})
		},
		resetScrolling() {
			document.body.style.overflow = "";
		},
		reloadData() {
				getCurrentUser().then( (user) => {
				if(user) {
					this.user = user

					DB_checkValidAPIKey().then((res) => {
						if(!res) {
							DBL_logoutUser().then(() => {
								this.$router.push("/");
								this.toast.error("Invalid API Key.")
							});
						} else {
							DB_getPasswordsForSpecificFolder(store.temp.curr_folder_name).then( (res) => {
								if (res) {
									this.passwords = rankPasswordsAlphabetically(res);
									return;
								} else if (res === -1) {
									this.toast.error("Invalid Parameters!");
								} else if (res === -2) {
									this.toast.error("Invalid API key!")
								} else if (res === -3) {
									this.toast.error("Internal API Error!")
								} else {
									this.toast.error("API Error!")
								}
								this.$router.push("/home");
							})
						}})
				} else {
					this.$router.push('/');
				}
		})
	}
	},
	beforeMount() {
		this.reloadData()
	}
}

</script>

<style scoped>
#wrapperl {
		max-width: 700px;
		margin-left: 45%;
		transform: translateX(-50%);
		width: 100%;
}

#posNameInput {
	margin-top: 10vh;
	margin-bottom: 1vh;
}

#posNoteInput {
	margin-top: 10px;
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



@media (min-width : 700px) {
	#wrapperl {
		margin-left: 48.5%;
}
}
</style>
