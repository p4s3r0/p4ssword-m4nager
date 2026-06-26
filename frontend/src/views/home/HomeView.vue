<script setup>
import SearchBar from "@/components/SearchBar.vue";
import {
  rankFoldersBySearch,
  rankPasswordsBySearch,
  rankPasswordsAlphabetically,
  rankFolderAlphabetically,
  rankTfasBySearch,
  rankTfasAlphabetically,
} from "@/scripts/search";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
import API from "@/plugins/axios";
import Header from "@/views/home/_components/Header.vue";
import Navigation from "@/views/home/_components/Navigation.vue";

const router = useRouter();
const route = useRoute();

const transitionName = ref("slide-right");
const routeOrder = {
  "home.folders": 0,
  "home.passwords": 1,
  "home.tfas": 2,
};

const fold_pass_selector = ref(route.name);
const folders = ref([]);
const passwords = ref([]);
const twoFactors = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const allFolders = ref([]);
const allPasswords = ref([]);
const allTfas = ref([]);

watch(() => route.name, (to, from) => {
    fold_pass_selector.value = to;

    if (from) {
      transitionName.value = routeOrder[to] > routeOrder[from] ? "slide-right" : "slide-left";
    }
  },
  { immediate: true }
);

const userStore = useUserStore();
API.get("users/get_theme").then((response) => {
  if (response.data === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

function logout() {
  API.delete("users/sign_out").then(() => {
    userStore.removeUser();
    router.push({ name: "login" });
  });
}


function search() {
  if (fold_pass_selector.value === "home.folders") {
    rankFoldersBySearch([...allFolders.value], searchQuery.value).then((res) => {
      folders.value = res;
    });
  } else if (fold_pass_selector.value === "home.tfas") {
    rankTfasBySearch([...allTfas.value], searchQuery.value).then((res) => {
      twoFactors.value = res;
    });
  } else {
    rankPasswordsBySearch([...allPasswords.value], searchQuery.value).then((res) => {
      passwords.value = res;
    });
  }
}

async function reloadData() {
  const passwordsApi = await API.get("passwords");
  allPasswords.value = rankPasswordsAlphabetically(passwordsApi.data);
  passwords.value = [...allPasswords.value];

  const foldersApi = await API.get("folders");
  allFolders.value = rankFolderAlphabetically(foldersApi.data);
  folders.value = [...allFolders.value];

  const twoFactorsApi = await API.get("tfas");
  allTfas.value = rankTfasAlphabetically(twoFactorsApi.data);
  twoFactors.value = [...allTfas.value];

  loading.value = false;
  if (searchQuery.value) {
    search();
  }
}

reloadData();

watch(fold_pass_selector, () => {
  searchQuery.value = "";
  search();
});
</script>

<template>
  <div class="home-view-container">
    <Header />
    <div class="search-bar-container">
      <search-bar
        v-model="searchQuery"
        @value-updated="search"
      />
    </div>

    <div class="show-folders-or-passwords">
      <Navigation
        v-model="fold_pass_selector"
        @reload="reloadData"
      />
    </div>

    <div class="sub-view-container">
      <router-view v-slot="{ Component }">
        <transition
          :name="transitionName"
        >
          <component
            :is="Component"
            :key="route.name"
            :passwords="passwords"
            :folders="folders"
            :tfas="twoFactors"
            @reload="reloadData"
          />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>

.home-view-container {
  display: flex;
  flex-direction: column;
  gap: var(--gap-5);
  padding: var(--gap-3);
  margin-top: 50px;

  .search-bar-container {
    display: flex;
    justify-content: center;
  }

  .show-folders-or-passwords {
    display: flex;
    width: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
    max-width: 650px;
    justify-content: space-between;

  }
}

.sub-view-container {
  display: grid;
  grid-template-columns: 100%;
  width: 100%;
  overflow-x: hidden;
  min-height: 400px;

  & > * {
    grid-area: 1 / 1;
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-out;
}

.slide-right-enter-active,
.slide-left-enter-active {
  z-index: 2;
}

.slide-right-leave-active,
.slide-left-leave-active {
  z-index: 1;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
