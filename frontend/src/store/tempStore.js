import { defineStore } from "pinia";

export const useTempStore = defineStore('tempStore', {
  state: () => ({
    tfa: null,
    password: null,
    folder: null
  }),
  getters: {
    getTfa: (state) => { return state.tfa; },
    getPassword: (state) => { return state.password; },
    getFolder: (state) => { return state.folder; },
  },
  actions: {
    setTfa(tfa) {
      this.tfa = tfa;
    },
    setPassword(password) {
      this.password = password;
    },
    setFolder(folder) {
      this.folder = folder;
    }
  },
});