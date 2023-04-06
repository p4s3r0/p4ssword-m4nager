import { createApp } from 'vue'
import * as VueRouter from 'vue-router';

import App from './App.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegisterView.vue'


const routes = [{
    path: "/",
    name: "login",
    component: Login,
}, {
    path: "/register",
    name: "register",
    component: Register,
}];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});


createApp(App).use(router).mount('#app')