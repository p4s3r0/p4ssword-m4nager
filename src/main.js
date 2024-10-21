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
import OnboardingView from './views/Onboarding.vue';

import './registerServiceWorker'

import { useToast } from "vue-toastification";
const toast = useToast()

import { getCurrentUser, DBL_getOnboarding } from "@/dexie.js"

import data from '../package.json';
export const APP_VERSION =  data.version;


import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';


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
	name: "onboarding",
	path: "/onboarding",
	component: OnboardingView,
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

let onboarding = true;
export function activateOnboarding() {
	onboarding = true;
}
// Authentication Guard on route change
router.beforeEach((to, from, next) => {
	if(to.name === "activate_onboarding") {
		onboarding = true;
		to.name = "onboarding"
	}
	getCurrentUser().then((user) => {
		if((to.name !== "login" && to.name !== "register" && to.name !== "onboarding") && !user) {
			toast.error("Login Before Proceeding")
			next({name: "login"});
		}
		else if(to.name === "onboarding" && !onboarding) {
			next({name: "login"})
		}
		else if(to.name === "login" && onboarding) {
			if(user) {
				toast.info("Cached Login with user `" + user.username + "`")
				next({name: "home"})
			}
			else
			{
				DBL_getOnboarding().then((res) => {
					if(res) {
						next({name: "onboarding"})
					} else {
						onboarding = false;
						next({name: "login"})
					}
				})
			}
		}
		else {
			next()
		}
	})
})


const toast_options = {
		maxToasts: 3,
		position: POSITION.TOP_RIGHT,
		timeout: 1500,
}

export function browserIsSafari() {
	return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
}


export const AXIOS_BASE_URL="https://api-p4ssword-m4nager.p4s3r0.it/"



import Button from "primevue/button"
import FloatLabel from 'primevue/floatlabel';
import Select from 'primevue/select';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import InputNumber from 'primevue/inputnumber';
import Password from 'primevue/password';



import 'primeicons/primeicons.css'



const app = createApp(App);
app.component('Button', Button);
app.component('FloatLabel', FloatLabel);
app.component('InputText', InputText);
app.component('Select', Select);
app.component('Checkbox', Checkbox);
app.component('Slider', Slider);
app.component('InputNumber', InputNumber);
app.component('Password', Password);

app.use(router).use(VueCryptojs).use(Toast, toast_options).use(PrimeVue, {
	theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: true
        }
    }
}
).mount('#app');
