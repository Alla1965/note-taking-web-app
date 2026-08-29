import { createContext, use, useEffect, useState } from "react";

export const ThemeContext = createContext(null);


export const ThemeProvider = ({ children }) => {
       const [theme, setTheme] = useState("light");
       const [fontTheme, setFontTheme] = useState("sans-serif");
    const getSystemTheme = () =>
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      

    const [systemTheme, setSystemTheme] =useState(getSystemTheme);

    // Наблюдение за изменениями системной темы   
    useEffect(() => {
                       const mediaQuery=window.matchMedia("(prefers-color-scheme: dark)")
                            
                       const handleChange = (event) => {
                            setSystemTheme(event.matches ? "dark" : "light"); };
                                        
                       mediaQuery.addEventListener("change", handleChange);

                       return () => {
                        mediaQuery.removeEventListener("change", handleChange); };
                      }, [] );
  
   const resolvedTheme =  theme === "system" ? systemTheme : theme;

  return (
  <ThemeContext value={{ theme, setTheme,  resolvedTheme, fontTheme,  setFontTheme, }}>
    {children}
  </ThemeContext>
);
};


export const useTheme = () => use(ThemeContext);

