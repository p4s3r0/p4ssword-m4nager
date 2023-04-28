import { createApp } from 'vue'
import * as VueRouter from 'vue-router';
import VueCryptojs from 'vue-cryptojs'

import App from './App.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import Home from '@/views/HomeView.vue'
import FolderView from '@/views/FolderView.vue'
import AddPasswordOrFolder from '@/views/AddNewPasswordOrFolder.vue'
import PasswordView from '@/views/PasswordView.vue'
import EditFolder from '@/views/EditFolder.vue'
import EditPassword from '@/views/EditPassword.vue'
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
}];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});


createApp(App).use(router).use(VueCryptojs).mount('#app')