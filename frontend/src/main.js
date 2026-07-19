import { createApp } from "vue";
import { createPinia } from 'pinia';
import VueCryptojs from "vue-cryptojs";
import App from "./App.vue";
import data from "../package.json";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import "@/styles/core.scss";
import ToastService from 'primevue/toastservice';

const pinia = createPinia();

import { router } from "@/plugins/router";

export const APP_VERSION = data.version;

import { DialogService } from "primevue";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import Select from "primevue/select";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Slider from "primevue/slider";
import InputNumber from "primevue/inputnumber";
import Password from "primevue/password";
import FileUpload from "primevue/fileupload";
import DynamicDialog from "primevue/dynamicdialog";
import SelectButton from "primevue/selectbutton";
import TextArea from "primevue/textarea";
import Toast from 'primevue/toast';

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
app.component("DynamicDialog", DynamicDialog);
app.component("SelectButton", SelectButton);
app.component("TextArea", TextArea);
app.component("Toast", Toast);

app
  .use(pinia)
  .use(router)
  .use(VueCryptojs)
  .use(DialogService)
  .use(ToastService)
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
