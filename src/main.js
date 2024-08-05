import { createApp } from 'vue'
import * as VueRouter from 'vue-router';

import VueCryptojs from 'vue-cryptojs'
import "vue-toastification/dist/index.css";
import Toast, { POSITION } from "vue-toastification";
import '@/global.css'
import "@/assets/toasts.css"

import App from './App.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'
import Home from '@/views/HomeView.vue'
import FolderView from '@/views/FolderView.vue'
import Error404 from './views/Error404.vue';

import './registerServiceWorker'

import { useToast } from "vue-toastification";
const toast = useToast()

import { getCurrentUser } from "@/dexie.js"

import data from '../package.json';
export const APP_VERSION =  data.version;

const routes = [{
  name: "login",
  path: "/",
  component: Login,
}, {
  name: "register",
  path: "/register",
  component: Register,
}, {
  name: "home",
  path: "/home",
  component: Home,
}, {
  name: "folder",
  path: "/folder",
  component: FolderView,
},{
  name: "404",
  path: "/:pathMatch(.*)*",
  component: Error404
}
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});


// Authentication Guard on route change
router.beforeEach((to, from, next) => {
    getCurrentUser().then((user) => {
        if((to.name !== "login" && to.name !== "register") && !user) {
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
    maxToasts: 3,
    position: POSITION.TOP_RIGHT,
    timeout: 1500,
}



export const AXIOS_BASE_URL="https://api-p4ssword-m4nager.p4s3r0.it/"

createApp(App).use(router).use(VueCryptojs).use(Toast, toast_options).mount('#app');
