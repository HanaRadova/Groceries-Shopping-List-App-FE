import React, { createContext, useContext, useState } from "react";
import { translations } from "../translations";

export type Language = "en" | "de";

const LanguageContext = createContext<any>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev: Language) => (prev === "en" ? "de" : "en"));
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
