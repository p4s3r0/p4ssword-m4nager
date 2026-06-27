import Login from "@/views/LoginView.vue";
import PasskeyLogin from "@/views/PasskeyLoginView.vue";
import * as VueRouter from "vue-router";
import { useUserStore } from "@/store/userStore";
import { DBL_getOnboarding } from "@/dexie";
import MainLayout from "@/layouts/MainLayout.vue";

export const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        name: "login",
        path: "",
        component: Login,
      },
      {
        name: "passkey-login",
        path: "passkey-login",
        component: PasskeyLogin,
      },
      {
        name: "register",
        path: "register",
        component: () => import("@/views/RegisterView.vue"),
      },
      {
        name: "home",
        path: "home",
        redirect: () => ({ name: "home.passwords" }),
        component: () => import("@/views/home/HomeView.vue"),
        children: [
          {
            name: "home.passwords",
            path: "passwords",
            component: () => import("@/views/home/passwords/PasswordsView.vue"),
          },
          {
            name: "home.folders",
            path: "folders",
            component: () => import("@/views/home/folders/FoldersView.vue"),
          },
          {
            name: "home.tfas",
            path: "tfas",
            component: () => import("@/views/home/tfas/TfasView.vue"),
          }
        ]
      },
      {
        name: "folder.passwords",
        path: "folder/:id",
        component: () => import("@/views/home/folders/folder/FolderView.vue"),
      },
      {
        name: "onboarding",
        path: "onboarding",
        component: () => import("@/views/OnboardingView.vue"),
      },
    ]
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
  if (!["login", "register", "onboarding", "passkey-login"].includes(to.name) && !userStore.initialized) {
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

    return next({ name: "passkey-login" });
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
      return next({ name: "passkey-login" });
    }

    return next();
  }

  if (!["login", "register", "onboarding", "passkey-login"].includes(to.name) && !userStore.isLoggedIn) {
    // toast.error("Login Before Proceeding");
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