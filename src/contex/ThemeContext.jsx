// createContext — создаёт контекст;
// createContext создаёт специальный объект, 
// через который данные можно передать сразу всем вложенным компонентам.
// use — читает значение контекста;
// useState — хранит изменяемое состояние темы.

import { createContext, use, useState } from "react";

// Создаём объект контекста и экспортируем его.
// Сам ThemeContext не хранит тему. 
// Он похож на канал, по которому провайдер передаёт данные компонентам.
export const ThemeContext = createContext(null);

// { children } — деструктуризация объекта props.
export const ThemeProvider = ({ children }) => {
  console.log("children.props.type.name", children.type.name);
  
//   Создаём состояние темы.
// theme — текущее значение;
// setTheme — функция обновления значения;
// "light" — начальная тема.

  const [theme, setTheme] = useState("light");

  // Создаём функцию переключения темы.
  // previousTheme - это текущее значение theme

  const toggleTheme =  () =>(
    setTheme((previousTheme) => 
   previousTheme === "light" ? "dark" : "light"
    ));
 console.log("theme", theme);
  console.log("toggleTheme", toggleTheme);
 
  return (
  <ThemeContext value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext>
);
};
// Создаём пользовательскую функцию useTheme и экспортируем её.
// Она выполняет use(ThemeContext) и возвращает значение ближайшего провайдера.
export const useTheme = () => use(ThemeContext);

