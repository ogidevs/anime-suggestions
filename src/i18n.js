import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
i18n
  .use(HttpBackend) // for loading translations
  .use(initReactI18next) // for using i18next in React
  .init({
    lng: "sr", // default language
    fallbackLng: "sr", // fallback language
    debug: true, // enable debug mode

    interpolation: {
      escapeValue: false, // React already does escaping
    },
    backend: {
      // path to translations
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
