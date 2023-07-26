import { createApp } from 'vue'
import * as VueRouter from 'vue-router';

import VueCryptojs from 'vue-cryptojs'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'animate.css';

import App from './App.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import Home from '@/views/HomeView.vue'
import FolderView from '@/views/FolderView.vue'
import AddPasswordOrFolder from '@/views/AddNewPasswordOrFolder.vue'
import PasswordView from '@/views/PasswordView.vue'
import EditFolder from '@/views/EditFolder.vue'
import EditPassword from '@/views/EditPassword.vue'
import TwoFa from '@/views/TwoFaView.vue'
import Edit2FA from '@/views/Edit2FA.vue';

import './registerServiceWorker'


const routes = [{
    path: "/",
    name: "login",
    component: Login,
}, {
    path: "/register",
    name: "register",
    component: Register,
}, {
    path: "/home",
    name: "home",
    component: Home,
}, {
    path: "/folder",
    name: "folder",
    component: FolderView,
}, {
    path: "/addPasswordOrFolder",
    name: "addPasswordOrFolder",
    component: AddPasswordOrFolder,
}, {
    path: "/password",
    name: "password",
    component: PasswordView,
}, {
    path: "/editFolder",
    name: "editFolder",
    component: EditFolder,
}, {
    path: "/editPassword",
    name: "editPassword",
    component: EditPassword,
}, {
    path: "/twoFA",
    name: "twoFA",
    component: TwoFa,
}, {
    path: "/edit2FA",
    name: "edit2FA",
    component: Edit2FA,
}];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});


const toast_options = {
    maxToasts: 1
}



export const AXIOS_BASE_URL = process.env.VUE_APP_AXIOS_BASE_URL

let app = createApp(App)

app.use(router).use(VueCryptojs).use(Toast, toast_options).mount('#app');

app.config.globalProperties.APP_VERSION = "@" + "4.1"