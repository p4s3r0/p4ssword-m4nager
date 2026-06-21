import { createApp } from "vue";
import { createPinia } from 'pinia';
import VueCryptojs from "vue-cryptojs";
import "vue-toastification/dist/index.css";
import Toast, { POSITION } from "vue-toastification";
import "@/core.scss";
import "@/assets/toasts.css";
import App from "./App.vue";
import data from "../package.json";
import "./registerServiceWorker";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import "./core.scss";

const pinia = createPinia();

import { router } from "@/plugins/router";

export const APP_VERSION = data.version;


const toast_options = {
  maxToasts: 3,
  position: POSITION.TOP_RIGHT,
  timeout: 1500,
};

export function browserIsSafari() {
  return (
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
        (typeof safari !== "undefined" && window["safari"].pushNotification)
    )
  );
}

import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import Select from "primevue/select";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Slider from "primevue/slider";
import InputNumber from "primevue/inputnumber";
import Password from "primevue/password";
import FileUpload from "primevue/fileupload";

const app = createApp(App);
// eslint-disable-next-line vue/no-reserved-component-names
app.component("Button", Button);
app.component("FloatLabel", FloatLabel);
app.component("InputText", InputText);
// eslint-disable-next-line vue/no-reserved-component-names
app.component("Select", Select);
app.component("Checkbox", Checkbox);
app.component("Slider", Slider);
app.component("InputNumber", InputNumber);
app.component("Password", Password);
app.component("FileUpload", FileUpload);

app
  .use(pinia)
  .use(router)
  .use(VueCryptojs)
  .use(Toast, toast_options)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: "p",
        cssLayer: true,
      },
    },
  })
  .mount("#app");
