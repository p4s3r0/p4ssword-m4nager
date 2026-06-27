import { defineStore } from "pinia";
import { biometricDecrypt, biometricEncrypt } from "@/plugins/biometric_authentication";
import API from "@/plugins/axios";

const dev_password = "password";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    username: null,
    key: null,
    sessionToken: null,
    initialized: false,
  }),
  getters: {
    getUser: (state) => {
      return {
        username: state.username,
        key: state.key,
        sessionToken: state.sessionToken,
      };
    },
    isLoggedIn: (state) => {
      return state.username != null && state.key != null;
    }
  },
  actions: {
    async loginUser(authenticationId, username, key, sessionToken) {
      try {
        this.username = username;
        this.key = import.meta.env.DEV ? dev_password : key;
        this.sessionToken = sessionToken;
        this.initialized = true;

        const encrypted = await biometricEncrypt(this.key, authenticationId);
        localStorage.setItem("key", encrypted.ciphertext);
        localStorage.setItem("iv", encrypted.iv);
        localStorage.setItem("sessionToken", sessionToken);
        return true;
      } catch (error) {
        return false;
      }
    },
    async setUser() {
      try {
        const encryptedKey = localStorage.getItem("key");
        const authenticationId = localStorage.getItem("authentication-id");
        const username = localStorage.getItem("username");
        const iv = localStorage.getItem("iv");
        const sessionToken = localStorage.getItem("sessionToken");
        const key = await biometricDecrypt(iv, encryptedKey, authenticationId);
        
        const response = await API.post("users/refresh", { username, session_token: sessionToken });

        this.username = username;
        this.key = import.meta.env.DEV ? dev_password : key;
        this.sessionToken = response.data.user.session_token;
        this.initialized = true;
        return true;
      } catch(error) {
        return false;
      }
    },
    removeUser() {
      this.username = null;
      this.key = null;
      this.sessionToken = null;
      this.initialized = false;
      localStorage.removeItem("key");
      localStorage.removeItem("authentication-id");
      localStorage.removeItem("iv");
      localStorage.removeItem("prfSalt");
      localStorage.removeItem("username");
      localStorage.removeItem("sessionToken");
    }
  },
});