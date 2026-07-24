import { createI18n } from "vue-i18n";
import en from "@/locales/en";
import de from "@/locales/de";
import it from "@/locales/it";


export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("locale") || "en",
  fallbackLocale: "en",
  globalInjection: true,
  messages: {
    en,
    de,
    it
  },
});

export const t = (...args) => i18n.global.t(...args);

export default i18n;
