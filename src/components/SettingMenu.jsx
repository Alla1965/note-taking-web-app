import {Link } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";
import SunIcon from "./icons/SunIcon.jsx";
import FontIcon from "./icons/FontIcon.jsx";
import LockIcon from "./icons/LockIcon.jsx";
import LogoutIcon from "./icons/LogoutIcon.jsx";
import ChevronRightIcon from "./icons/ChevronRightIcon.jsx";
import MobileNavigation from "./MobileNavigation.jsx";


const SettingMenu = () => {

const { theme } = useTheme();
// const {fontTheme, setFontTheme,} = useTheme();

    return(
        <section className="flex flex-col  gap-4 pt-6 px-4 md:px-8 flex-1  
                            h-full min-h-0 w-full overflow-hidden ">

        
         <img className="flex object-contain object-left bg-app-hover-bg w-full
                         h-[54px] px-4 py-[13px]
                          md:h-[74px] md:px-8 md:py-[23px] lg:hidden "
                src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes"
                 />


           
           <h2 className="text-preset-1 lg:hidden">Settings</h2>   

           <ul className="flex flex-col flex-1 overflow-y-auto min-h-0 
                          text-app-text text-preset-4 font-medium
                           gap-2  lg:border-r  lg:border-app-border">

               <li>
               <Link to="/setting/theme"
               className="group flex justify-between py-[9.5px] lg:p-2 
               hover:bg-app-hover-bg rounded-lg hover:text-app-bright-text"> 
                     <div className="flex gap-2">
                         <SunIcon /> 
                         <p>Color Theme </p>
                     </div> 
                     <ChevronRightIcon className="text-app-text w-5 ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
               </Link>
               </li>
                
               <li>
               <Link to="/setting/font"
                  className="group flex justify-between py-[9.5px] lg:p-2 hover:bg-app-hover-bg rounded-lg hover:text-app-bright-text">
                     <div className="flex gap-2">
                        <FontIcon />
                         <p>Font Theme </p>
                     </div>
                     <ChevronRightIcon className="text-app-text w-5 ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
               </Link>
              </li>

              <li>
               <Link to="/setting/password"
                     className="group flex justify-between py-[9.5px] lg:p-2 border-b  border-app-border
                                hover:bg-app-hover-bg rounded-lg hover:text-app-bright-text">
                     <div className="flex gap-2">
                      <LockIcon />
                       <p>Change Password </p>
                    </div>
                     <ChevronRightIcon className="text-app-text w-5 ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
               </Link >
               </li>

                <li>
               <Link to="/logout"
               className="group flex justify-between py-[9.5px] lg:p-2 hover:bg-app-hover-bg rounded-lg hover:text-app-bright-text">
                     <div className="flex gap-2">
                        <LogoutIcon />
                       <p>Logout </p>
                     </div>
                    <ChevronRightIcon className="text-app-text w-5 ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
               </Link>
               </li>
           </ul>
         

         <div className=" shrink-0">
         <MobileNavigation />
         </div>

        </section>
   )
}
export default SettingMenu;