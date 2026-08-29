import {Link, useLocation} from "react-router-dom";
import SearchIcon from "./icons/SearchIcon.jsx";
import SettingIcon from "./icons/SettingIcon.jsx";

const Header = ({ className }) => {

  
    const location=useLocation();
   
        const isSettingsPage =
              location.pathname.startsWith("/setting");
        const pageTitle = isSettingsPage
              ? "Settings"
              : "All Notes";

  return ( 
    <header className={`flex justify-between px-8 py-[18.5px] 
                        border-b  border-app-border text-app-bright-text ${className}`}>
       <h1 className="text-preset-1  flex-1">{pageTitle}</h1>
            <div className="flex gap-4 items-center">

             <div className="flex items-center gap-2 px-4 py-[13px]
                           border border-app-border rounded-lg">
               <SearchIcon className=" w-5 shrink-0 text-app-text-muted" />
               <input className="flex-1 text-preset-5 min-w-0 bg-transparent outline-none
                               text-app-text placeholder:text-app-text-muted"
                    type="text"
                    placeholder="by title, content, or tags…"/>
             </div> 

      <Link  to="/setting" aria-label="Open settings">
           <SettingIcon className="w-6 text-app-text-muted"/>
       </Link>
          
          </div>
    </header>

    );
};

export default Header;