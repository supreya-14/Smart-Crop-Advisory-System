import { createContext, useContext, useState, useEffect } from "react";

// This context manages dark/light mode across the whole app.
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check localStorage first so the user's preference is remembered
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Whenever darkMode changes, add/remove the "dark" class on the <html> tag
  // (Tailwind uses this class to apply dark: styles)
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
