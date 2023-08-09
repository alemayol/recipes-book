import { useState, createContext } from "react";

const ThemeContext = createContext();

const initialTheme =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const $body = document.querySelector("body");

$body.dataset.theme = initialTheme;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      $body.dataset.theme = "dark";
    } else {
      setTheme("light");
      $body.dataset.theme = "light";
    }
  };

  const data = { theme, handleTheme };

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
