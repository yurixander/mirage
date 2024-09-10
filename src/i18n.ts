import i18n from "i18next"
import {initReactI18next} from "react-i18next"
import HttpBackend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"

void i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: [
      "common",
      "events",
      "login",
      "navigation",
      "notifications",
      "roomContainer",
      "roster",
      "welcomeSplash",
    ],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  })

export {default} from "i18next"
