import {Link } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";
import SearchIcon from "./icons/SearchIcon.jsx";
import SettingIcon from "./icons/SettingIcon.jsx";

const Header = ({ className }) => {

   const { theme, toggleTheme } = useTheme();

  return ( 
    <header className={`flex justify-between px-8 py-[18.5px] 
                        border-b  border-app-border ${className}`}>
       <h1 className="text-preset-1 text-app-bright-text flex-1">All Notes </h1>
            <div className="flex gap-4 items-center">

             <div className="flex items-center gap-2 px-4 py-[13px]
                           border border-app-border rounded-lg">
               <SearchIcon className=" w-5 shrink-0 text-app-text-muted" />
               <input className="flex-1 text-preset-5 min-w-0 bg-transparent outline-none
                               text-app-text placeholder:text-app-text-muted"
                    type="text"
                    placeholder="by title, content, or tags…"/>
             </div> 
  <Link  to="/setting" aria-label="Create setting"
              className="">
           <SettingIcon className="w-6 text-app-text-muted"/>
       </Link>
          
          </div>
    </header>

    );
};

export default Header;