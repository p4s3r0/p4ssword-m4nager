import Login from "@/views/LoginView.vue";
import PasskeyLogin from "@/views/PasskeyLoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import HomeView from "@/views/home/HomeView.vue";
import PasswordsView from "@/views/home/passwords/PasswordsView.vue";
import FoldersView from "@/views/home/folders/FoldersView.vue";
import TfasView from "@/views/home/tfas/TfasView.vue";
import FolderView from "@/views/home/folders/folder/FolderView.vue";
import Error404 from "@/views/Error404.vue";
import * as VueRouter from "vue-router";
import { useUserStore } from "@/store/userStore";
import { DBL_getOnboarding } from "@/dexie";
import MainLayout from "@/layouts/MainLayout.vue";
import { recoverFromChunkLoadError } from "@/plugins/chunkLoadRecovery";
import { t } from "@/plugins/i18n";
import ToastEventBus from "primevue/toasteventbus";
import { TOAST_LIFESPAN } from "@/helper/constants";

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
        component: RegisterView,
      },
      {
        name: "home",
        path: "home",
        redirect: () => ({ name: "home.passwords" }),
        component: HomeView,
        children: [
          {
            name: "home.passwords",
            path: "passwords",
            component: PasswordsView,
          },
          {
            name: "home.folders",
            path: "folders",
            component: FoldersView,
          },
          {
            name: "home.tfas",
            path: "tfas",
            component: TfasView,
          }
        ]
      },
      {
        name: "folder.passwords",
        path: "folder/:id",
        component: FolderView,
      },
    ]
  },
  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: Error404,
  },
];


export const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

router.onError((error) => {
  void recoverFromChunkLoadError(error);
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
      ToastEventBus.emit("add", {
        severity: "info",
        summary: t("common.info"),
        detail: t("router.cachedLogin", { username: userStore.username }),
        life: TOAST_LIFESPAN,
      });
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
