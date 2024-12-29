import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import cs from "./cs.json"; // Import the existing Czech translations

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        logout: "Logout",
        dark_mode: "Dark Mode",
        light_mode: "Light Mode",
        main_page: "Main Page",
        active: "Active",
        archived: "Archived",
        delete: "Delete"
      }
    },
    cs: {
      translation: cs // Use the `cs.json` file as-is
    }
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false // React already escapes values
  }
});

export default i18n;
