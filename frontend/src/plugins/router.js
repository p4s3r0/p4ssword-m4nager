import Login from "@/views/LoginView.vue";
import * as VueRouter from "vue-router";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/store/userStore";
import { DBL_getOnboarding } from "@/dexie";
import { biometricDecrypt } from "@/plugins/biometric_authentication";

const toast = useToast();

export const routes = [
  {
    name: "login",
    path: "/",
    component: Login,
  },
  {
    name: "register",
    path: "/register",
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    name: "home",
    path: "/home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    name: "folder",
    path: "/folder",
    component: () => import("@/views/FolderView.vue"),
  },
  {
    name: "onboarding",
    path: "/onboarding",
    component: () => import("@/views/OnboardingView.vue"),
  },
  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/Error404.vue"),
  },
];


export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

let onboarding = true;
export function activateOnboarding() {
  onboarding = true;
}

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  if (!["login", "register", "onboarding"].includes(to.name) && !userStore.initialized) {
    if (userStore.isLoggedIn) {
      return next();
    }

    const authenticationId = localStorage.getItem("authentication-id");
    const key = localStorage.getItem("key");
    const iv = localStorage.getItem("iv");
    const username = localStorage.getItem("username");
    if (authenticationId === null || key === null || iv === null || username === null ) {
      return next({ name: "login" });
    }

    const success = await userStore.setUser();
    if (success) {
      return next({ name: "home" });
    } else {
      userStore.removeUser();
      return next({ name: "login" });
    }
  }

  if (to.name === "login" || to.name === "register") {
    if (userStore.isLoggedIn) {
      return next();
    }

    const authenticationId = localStorage.getItem("authentication-id");
    const key = localStorage.getItem("key");
    const iv = localStorage.getItem("iv");
    const username = localStorage.getItem("username");
    if (authenticationId !== null && key !== null && iv !== null && username !== null) {
      const password = await biometricDecrypt(iv, key, authenticationId);
      const success = await userStore.setUser(authenticationId, username, password);
      if (!success) {
        userStore.removeUser();
        return next({ name: "login" });
      }
      return next({ name: "home" });
    }

    return next();
  }

  if (!["login", "register", "onboarding"].includes(to.name) && !userStore.isLoggedIn) {
    toast.error("Login Before Proceeding");
    next({ name: "login" });
  } else if (to.name === "onboarding" && !onboarding) {
    next({ name: "login" });
  } else if (to.name === "login" && onboarding) {
    if (userStore.isLoggedIn) {
      toast.info("Cached Login with user `" + userStore.username + "`");
      return next({ name: "home" });
    }

    const response = await DBL_getOnboarding();
    if (response) {
      next({ name: "onboarding" });
    } else {
      onboarding = false;
      next({ name: "login" });
    }
  } else {
    next();
  }
});