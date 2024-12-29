import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext<any>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-wrapper ${theme}`}>{children}</div> {/* Apply theme */}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
