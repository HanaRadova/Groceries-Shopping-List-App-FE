import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export const useTranslation = () => {
  const { language } = useLanguage();

  return (key: keyof typeof translations["en"]) => {
    return translations[language]?.[key] || key;
  };
};
