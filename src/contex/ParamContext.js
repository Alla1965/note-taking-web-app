import { createContext, use } from "react";

export const ParamContext = createContext();


export const useParam = () => use(ParamContext);


console.log(ParamContext);
console.log(useParam);