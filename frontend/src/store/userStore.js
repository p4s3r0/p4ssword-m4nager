import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    username: null,
    key: null,
    apiKey: null,
    initialized: false,
  }),
  getters: {
    getUser: (state) => {
      return {
        username: state.username,
        key: state.key,
        apiKey: state.apiKey,
      };
    },
    isLoggedIn: (state) => {
      return state.username != null && state.key != null && state.apiKey != null;
    }
  },
  actions: {
    setUser(username, apiKey, key) {
      this.username = username;
      this.key = key;
      this.apiKey = apiKey;
      this.initialized = true;
    },
    removeUser() {
      this.username = null;
      this.key = null;
      this.apiKey = null;
      localStorage.removeItem("key");
      localStorage.removeItem("api-key");
      localStorage.removeItem("authentication-id");
    }
  },
});