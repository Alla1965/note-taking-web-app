import {Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../contex/ThemeContext.jsx";


import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.jsx"

import FontSansSerifIcon from "./icons/FontSansSerifIcon.jsx";
import FontSerifIcon from "./icons/FontSerifIcon.jsx";
import FontMonospaseIcon from "./icons/FontMonospaseIcon.jsx";
import MobileNavigation from "./MobileNavigation.jsx";



const FontTheme = () => {

const { theme } = useTheme();
const {fontTheme, setFontTheme,} = useTheme();
const [selectedFont, setSelectedFont] =  useState(fontTheme);
const applyFont = () => {setFontTheme(selectedFont);
};



    return(
        <section className="flex flex-col gap-4 
                            h-full min-h-0 w-full  ">
           
            <img className="flex object-contain object-left bg-app-hover-bg w-full
                         h-[54px] px-4 py-[13px]
                          md:h-[74px] md:px-8 md:py-[23px] lg:hidden "
                src={theme  === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes"
                 /> 

      <div className="flex flex-col pt-6 px-4 md:px-8 gap-5"> 

             <div className="flex flex-col lg:hidden ">  
            <Link className="flex items-center gap-1 w-20 mb-3"
                to="/setting">
                    
                       <ArrowLeftIcon  />
                    
               <p className=" ml-2 text-preset-4"> Setting</p>
            </Link>
            
           <h2 className="text-preset-1 mb-2">Font Theme</h2> 
           <p className="text-preset-5">Choose your font theme: </p> 

             </div>
                       
           <fieldset 
                    className="flex flex-col gap-4 text-preset-6">
            <legend className="sr-only">  Font Theme </legend>

               <label className="flex justify-between p-4 border rounded-xl 
                                 hover:bg-app-hover-bg cursor-pointer" >

                <div className="flex gap-4">

                  <div className="flex border border-app-border justify-center items-center w-10 h-10 rounded-xl"> 
                     <FontSansSerifIcon /> 
                  </div> 

                 <div className="flex flex-col justify-center gap-1.5">
                    <h3 className="text-preset-4 font-medium">Sans-serif </h3>
                    <p className="">Clean and modern, easy to read.</p>
                 </div>

                </div> 
                 
               <input type="radio"
                      value="sans-serif"
                      checked={selectedFont === "sans-serif"}
                      onChange={() => setSelectedFont("sans-serif")}
                      className="appearance-none w-4 h-4 shrink-0 rounded-full
                                  border border-app-border my-auto
                                  cursor-pointer transition-colors
                                  hover:border-blue-500
                                   
                                  checked:border-4 checked:border-blue-500
                                  focus-visible:outline-none focus-visible:ring-2
                                  focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      
                      name="fontTheme" /> 
                     
                 </label>
                
             
               <label  className="flex justify-between p-4 border rounded-xl 
                                 hover:bg-app-hover-bg cursor-pointer" >
                  <div className="flex gap-4">
                    <div className="flex border border-app-border justify-center items-center w-10 h-10 rounded-xl"> 
                     <FontSerifIcon /> 
                    </div> 

                     <div className="flex flex-col justify-center gap-1.5">
                        <h3 className="text-preset-4 font-medium">Serif</h3>
                        <p className="">Classic and elegant for a timeless feel.</p>
                     </div>

                  </div>
                 
                  <input type="radio"
                         value="serif"
                        checked={selectedFont === "serif"}
                        onChange={() => setSelectedFont("serif")} 
                         className="appearance-none w-4 h-4 shrink-0 rounded-full
                                  border border-app-border my-auto
                                  cursor-pointer transition-colors
                                  hover:border-blue-500
                                   
                                  checked:border-4 checked:border-blue-500
                                  focus-visible:outline-none focus-visible:ring-2
                                  focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                     name="fontTheme" /> 
               </label>
             
               <label  className="flex justify-between p-4 border rounded-xl 
                                 hover:bg-app-hover-bg cursor-pointer" >
                  <div className="flex gap-4 ">
                   <div className="flex border border-app-border justify-center items-center w-10 h-10 rounded-xl"> 
                     <FontMonospaseIcon /> 
                    </div> 

                     <div className="flex flex-col justify-center gap-1.5">
                        <h3 className="text-preset-4 font-medium">Monospace</h3>
                        <p className="">Code-like, great for a technical vibe.</p>
                     </div>

                  </div>
                 
                  <input type="radio"
                         value="monospace"
                         checked={selectedFont === "monospace"}
                         onChange={() => setSelectedFont("monospace")}
                         className="appearance-none w-4 h-4 shrink-0 rounded-full
                                  border border-app-border my-auto
                                  cursor-pointer transition-colors
                                  hover:border-blue-500
                                  checked:border-4 checked:border-blue-500
                                  focus-visible:outline-none focus-visible:ring-2
                                  focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        name="fontTheme" /> 
                
               </label>
               
           </fieldset>

             <button  type="button"
                    onClick={applyFont}
                    disabled={selectedFont === fontTheme}
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
export default FontTheme;