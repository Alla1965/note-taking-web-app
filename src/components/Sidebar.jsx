import {Link } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";
import HomeIcon from "./icons/HomeIcon.jsx";
import ChevronRightIcon from "./icons/ChevronRightIcon.jsx";
import ArchiveIcon from "./icons/ArchiveIcon.jsx";
import TagIcon from "./icons/TagIcon.jsx";
import tags from "../data/tags";

const Sidebar = ({ className }) => {


   const { theme, toggleTheme } = useTheme();

  return (
   <aside className={`flex w-full flex-col p-4 pb-3 bg-app-background-section 
                      border-r  border-app-border ${className}`}   >

         {/* Logo */}
         <button onClick={toggleTheme}>
         {theme === "light" ? "Светлая тема" : "Тёмная тема"}
        </button>
          <img className="w-24 py-3 mb-4"
                src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes"
                 />

        {/* Block All+Archived Notes */}
          <div className="flex flex-col p-3 gap-1 mb-2 border-b  border-app-border ">
            
             <Link className="group flex items-center p-3 gap-2 text-app-text
                             hover:bg-app-hover-bg rounded-lg hover:text-app-bright-text" >

               <HomeIcon className="text-app-text w-5 group-hover:text-blue-500" />
             
               <p className="text-preset-5 ">All Notes </p>

                <ChevronRightIcon className="text-app-text w-5 ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
               
            {/* <NotesList  /> */}
             </Link>

             <Link className="group flex items-center p-3 gap-2 text-app-text
                             hover:bg-app-hover-bg rounded-lg hover:text-app-bright-text" >

               <ArchiveIcon className="text-app-text w-5 group-hover:text-blue-500" />
             
               <p className="text-preset-5 hover:text-app-bright-text">Archived Notes </p>

                <ChevronRightIcon className="text-app-text w-5 ml-auto opacity-0
                                  transition-opacity group-hover:opacity-100" />
               
            {/* <NotesList  /> */}
             </Link>
          </div>
         
         {/* Block Teg */}
         <div className="">
           <p className="text-neutral-500 text-preset-4 pl-2 mb-2">Tags </p>
           <ul className="flex flex-col gap-1">
              {tags.map((tag) => (
                <li key={tag.id}
                    className="">

                   <Link  className="group flex gap-2 py-[10px] pl-3   hover:bg-app-hover-bg rounded-lg" >     
                      <TagIcon className=" " />
                        {tag.name}
                      <ChevronRightIcon className="text-app-text w-5 ml-auto opacity-0 
                                     transition-opacity group-hover:opacity-100" />
 
                   </Link> 

                </li>
              ))}
           </ul>
         </div>

       </aside>
  );
};

export default Sidebar;