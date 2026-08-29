import {Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../contex/ThemeContext.jsx";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.jsx"
import ShowPasswordIcon from "../components/icons/ShowPasswordIcon.jsx"
import MobileNavigation from "./MobileNavigation.jsx";

const PasswordChange = () => {

      const { resolvedTheme } = useTheme();
      // const {fontTheme, setFontTheme,} = useTheme();
      const [showCurrentPassword, setShowCurrentPassword] =  useState(false);
      const [showNewPassword, setShowNewPassword] =  useState(false);
      const [showConfirmPassword, setShowConfirmPassword] =  useState(false);
     
     return(
        <section className="flex flex-col gap-4 
                            h-full min-h-0 w-full  ">
           
            <img className="flex object-contain object-left bg-app-hover-bg w-full
                         h-[54px] px-4 py-[13px]
                          md:h-[74px] md:px-8 md:py-[23px] lg:hidden "
                src={resolvedTheme   === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes" /> 

        <div className="flex flex-col pt-6 px-4 md:px-8 gap-5"> 

             <div className="flex flex-col lg:hidden ">  
               <Link className="flex items-center gap-1 w-20 mb-3"
                to="/setting">
                   <ArrowLeftIcon  />
               <p className=" ml-2 text-preset-4"> Setting</p>
               </Link>
             <h2 className="text-preset-1 mb-2">Change Password</h2> 
             </div>
                       
           <form type="submit"
                 onSubmit={() => event.preventDefault()}
                 className="flex flex-col gap-4 text-preset-4 font-medium bg-app-background">
            
                <li className="flex flex-col gap-1.5">
                    
                    <label htmlFor="old-password">
                      Old Password
                    </label>
                    <div className="relative">
                       <input type={showCurrentPassword ? "text" : "password"}
                              id="old-password"
                              autoComplete="current-password" 
                              name="currentPassword"
                              required
                              className="w-full p-4 pr-12 border rounded-xl "  /> 
                      
                     <button 
                     type="button"
                     onClick={() => setShowCurrentPassword((previous) => !previous)}
                     aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                     aria-pressed={showCurrentPassword}
                     className="absolute inset-y-0 right-4
                      flex items-center justify-center">
                        <ShowPasswordIcon className="block w-5 h-5 " />
                     </button>
                    </div>

                </li>
                 
                <li className="flex flex-col gap-1.5">
                    
                    <label htmlFor="new-password">
                      New Password
                    </label>
                    <div className="relative">
                       <input type={showNewPassword ? "text" : "password"}
                              id="new-password"
                              autoComplete="new-password" 
                              name="newPassword"
                              required
                              className="w-full p-4 pr-12 border rounded-xl "  /> 
                      
                       <button 
                     type="button"
                     onClick={() => setShowNewPassword((previous) => !previous)}
                     aria-label={showNewPassword ? "Hide password" : "Show password"}
                     aria-pressed={showNewPassword}
                     className="absolute inset-y-0 right-4
                      flex items-center justify-center">
                        <ShowPasswordIcon className="block w-5 h-5" />
                     </button>
                    </div>

                </li>
                 
                <li className="flex flex-col gap-1.5">
                    
                    <label htmlFor="confirm-new-password">
                      Confirm New Password
                    </label>
                    <div className="relative">
                       <input type={showConfirmPassword ? "text" : "password"}
                              id="confirm-new-password"
                              autoComplete="new-password"
                              name="confirmNewPassword"
                              required
                              className="w-full p-4 pr-12 border rounded-xl "   /> 
                    
                         <button 
                           type="button"
                           onClick={() => setShowConfirmPassword((previous) => !previous)}
                           aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                           aria-pressed={showConfirmPassword}
                           className="absolute inset-y-0 right-4
                                      flex items-center justify-center">
                        <ShowPasswordIcon className="block w-5 h-5" />
                     </button>
                    </div>

                </li>
               
           </form>

             <button  type="button"
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

export default PasswordChange;