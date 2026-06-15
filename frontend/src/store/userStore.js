import { defineStore } from "pinia";
import { biometricDecrypt, biometricEncrypt, biometricRegister } from "@/plugins/biometric_authentication";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    username: null,
    key: null,
    initialized: false,
  }),
  getters: {
    getUser: (state) => {
      return {
        username: state.username,
        key: state.key,
      };
    },
    isLoggedIn: (state) => {
      return state.username != null && state.key != null;
    }
  },
  actions: {
    async loginUser(authenticationId, username, key) {
      try {
        this.username = username;
        this.key = import.meta.env.DEV ? "password" : key;
        this.initialized = true;

        const encrypted = await biometricEncrypt(this.key, authenticationId);
        localStorage.setItem("key", encrypted.ciphertext);
        localStorage.setItem("iv", encrypted.iv);
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
        const key = await biometricDecrypt(iv, encryptedKey, authenticationId);
        this.username = username;
        this.key = import.meta.env.DEV ? "password" : key;
        this.initialized = true;
        return true;
      } catch(error) {
        return false;
      }
    },
    removeUser() {
      this.username = null;
      this.key = null;
      this.initialized = false;
      localStorage.removeItem("key");
      localStorage.removeItem("authentication-id");
      localStorage.removeItem("iv");
      localStorage.removeItem("prfSalt");
      localStorage.removeItem("username");
    }
  },
});