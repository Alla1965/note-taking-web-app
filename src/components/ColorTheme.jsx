import {Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../contex/ThemeContext.jsx";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.jsx"
import SunIcon from "./icons/SunIcon.jsx";
import MoonIcon from "./icons/MoonIcon.jsx";
import SystemThemeIcon from "./icons/SystemThemeIcon.jsx";
import MobileNavigation from "./MobileNavigation.jsx";



const ColorTheme = () => {

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const applyTheme = () => { setTheme(selectedTheme); };

    return(
        <section className="flex flex-col gap-4 
                            h-full min-h-0 w-full  ">
           
            <img className="flex object-contain object-left bg-app-hover-bg w-full
                         h-[54px] px-4 py-[13px]
                          md:h-[74px] md:px-8 md:py-[23px] lg:hidden "
                src={resolvedTheme  === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes"
                 /> 

      <div className="flex flex-col pt-6 px-4 md:px-8 gap-5"> 

             <div className="flex flex-col lg:hidden ">  
            <Link className="flex items-center gap-1 w-20 mb-3"
                to="/setting">
                    
                       <ArrowLeftIcon  />
                    
               <p className=" ml-2 text-preset-4"> Setting</p>
            </Link>
            
           <h2 className="text-preset-1 mb-2">Color Theme</h2> 
           <p className="text-preset-5">Choose your color theme: </p> 

             </div>
                       
           <fieldset 
                    className="flex flex-col gap-4 text-preset-6">
            <legend className="sr-only">Color Theme</legend>

               <label className="flex justify-between p-4 border rounded-xl 
                                 hover:bg-app-hover-bg cursor-pointer" >

                <div className="flex gap-4">

                  <div className="flex border border-app-border justify-center items-center w-10 h-10 rounded-xl"> 
                     <SunIcon /> 
                  </div> 

                 <div className="flex flex-col justify-center gap-1.5">
                    <h3 className="text-preset-4 font-medium">Light Mode</h3>
                    <p>Pick a clean and classic light theme</p>
                 </div>

                </div>
                 
               <input type="radio"
                      value="light"
                      checked={selectedTheme === "light"}
                      onChange={() => setSelectedTheme("light")}
                      className="appearance-none w-4 h-4 shrink-0 rounded-full
                                  border border-app-border my-auto
                                  cursor-pointer transition-colors
                                  hover:border-blue-500
                                   
                                  checked:border-4 checked:border-blue-500
                                  focus-visible:outline-none focus-visible:ring-2
                                  focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      
                      name="theme" /> 
                     
                  </label>
                
             
               <label  className="flex justify-between p-4 border rounded-xl 
                                 hover:bg-app-hover-bg cursor-pointer" >
                  <div className="flex gap-4">
                    <div className="flex border border-app-border justify-center items-center w-10 h-10 rounded-xl"> 
                     <MoonIcon /> 
                    </div> 

                     <div className="flex flex-col justify-center gap-1.5">
                        <h3 className="text-preset-4 font-medium">Dark Mode</h3>
                        <p className="">Select a sleek and modern dark theme</p>
                     </div>

                  </div>
                 
                  <input type="radio"
                         value="dark"
                         checked={selectedTheme === "dark"}
                         onChange={() => setSelectedTheme("dark")}   
                         className="appearance-none w-4 h-4 shrink-0 rounded-full
                                  border border-app-border my-auto
                                  cursor-pointer transition-colors
                                  hover:border-blue-500
                                   
                                  checked:border-4 checked:border-blue-500
                                  focus-visible:outline-none focus-visible:ring-2
                                  focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      name="theme" /> 
                  
               </label>
             
               <label  className="flex justify-between p-4 border rounded-xl 
                                 hover:bg-app-hover-bg cursor-pointer" >
                  <div className="flex gap-4 ">
                   <div className="flex border border-app-border justify-center items-center w-10 h-10 rounded-xl"> 
                     <SystemThemeIcon /> 
                    </div> 

                     <div className="flex flex-col justify-center gap-1.5">
                        <h3 className="text-preset-4 font-medium">System</h3>
                        <p className="">Adapts to your device's theme</p>
                     </div>

                  </div>
                 
                  <input type="radio"
                         value="system"
                         checked={selectedTheme === "system"}
                         onChange={() => setSelectedTheme("system")}
                         className="appearance-none w-4 h-4 shrink-0 rounded-full
                                  border border-app-border my-auto
                                  cursor-pointer transition-colors
                                  hover:border-blue-500
                                   
                                  checked:border-4 checked:border-blue-500
                                  focus-visible:outline-none focus-visible:ring-2
                                  focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                         name="theme" /> 
                 
               </label>
               
           </fieldset>

             <button  type="button"
                    onClick={applyTheme}
                    disabled={selectedTheme === theme}
                    className="w-[132px] py-3 px-4 ml-auto rounded-lg
                             bg-blue-500 text-neutral-0 text-preset-4
                             disabled:opacity-50 disabled:cursor-not-allowed"> 
              Apply Changes
             </button>
            </div>
 
       <div className="mt-auto shrink-0">
         <MobileNavigation />
       </div>

        </section>
   )
}
export default ColorTheme;