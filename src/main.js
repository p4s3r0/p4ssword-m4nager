import { createApp } from 'vue'
import * as VueRouter from 'vue-router';

import VueCryptojs from 'vue-cryptojs'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'animate.css';
import '@/global.css'

import App from './App.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import Home from '@/views/HomeView.vue'
import FolderView from '@/views/FolderView.vue'
import EditFolder from '@/views/EditFolder.vue'

import './registerServiceWorker'

import { useToast } from "vue-toastification";
const toast = useToast()

import { getCurrentUser } from "@/dexie.js"

import data from '../package.json';
export const APP_VERSION =  data.version;

console.log(data.version)
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
},{
    path: "/editFolder",
    name: "editFolder",
    component: EditFolder,
}];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});


// Authentication Guard on route change
router.beforeEach((to, from, next) => {
    getCurrentUser().then((user) => {
        if(to.name !== "login" && !user) {
        toast.error("Login Before Proceeding")
        next({name: "login"});
      } 
      else if(to.name === "login" && user) {
        toast.info("Cached Login with user `" + user.username + "`")
        next({name: "home"})
      } else {
        next()
      }
    })
  })


const toast_options = {
    maxToasts: 3
}



export const AXIOS_BASE_URL="https://api-p4ssword-m4nager.p4s3r0.it/"

let app = createApp(App)

app.use(router).use(VueCryptojs).use(Toast, toast_options).mount('#app');
