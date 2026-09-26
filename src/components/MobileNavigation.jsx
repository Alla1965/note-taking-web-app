import {Link} from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";
import HomeIcon from "./icons/HomeIcon.jsx";
import ArchiveIcon from "./icons/ArchiveIcon.jsx";
import TagIcon from "./icons/TagIcon.jsx";
import SearchIcon from "./icons/SearchIcon.jsx";
import SettingIcon from "./icons/SettingIcon.jsx";
import NotesList from "./NotesList.jsx";


const MobileNavigation = ({ className }) => {

const { theme } = useTheme();
// const {fontTheme, setFontTheme,} = useTheme();

  return (
    <nav className="border-t  border-app-border 
                    shadow-[var(--app-shadow)] lg:hidden">
        
        <ul className="flex py-3 text-app-text-button text-preset-6 w-full 
                       divide-x divide-app-border">
                        
            <Link  to="/" 
                    className="flex flex-1 justify-center items-center flex-col md:gap-1 text-app-text  
                               hover:text-blue-500">
                 <HomeIcon   />
                 <p className="hidden md:block">Home</p>
            </Link>

            <li className="flex flex-1 justify-center items-center md:flex-col md:gap-1 text-app-text  
                           hover:text-blue-500"> 
              <Link to="/search"
                   className="flex h-full w-full flex-col items-center justify-center gap-1 text-app-text hover:text-blue-500"
                    aria-label="Search notes">
                 <SearchIcon   />
                  <p className="hidden md:block">Search</p>
              </Link>
            </li>

            <li className="flex flex-1 justify-center items-center md:flex-col md:gap-1 text-app-text  
                    hover:text-blue-500"> 
                <Link to="/archived" 
                      className="flex h-full w-full flex-col items-center justify-center gap-1 text-app-text hover:text-blue-500"
>
                  <ArchiveIcon   />
                 <p className="hidden md:block">Archived</p>
                </Link>
               
            </li>
            <li className="flex flex-1 justify-center items-center md:flex-col md:gap-1 text-app-text  
                    hover:text-blue-500"> 
               <Link to="/tags">
               <TagIcon   />
               </Link>     
                 
                 <p className="hidden md:block">Tags</p>
            </li>
            <li className="flex flex-1 justify-center items-center md:flex-col md:gap-1 text-app-text  
                    hover:text-blue-500"> 
                    <Link to="/setting" aria-label="Create setting"
                          className="flex h-full w-full flex-col items-center justify-center gap-1 text-app-text hover:text-blue-500"
>
                     <SettingIcon   />
                    <p className="hidden md:block">Settings</p>
                    </Link>
                
            </li>
        </ul>
        
    </nav>
    );
};

export default MobileNavigation;