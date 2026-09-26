import {Link } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";
import HomeIcon from "./icons/HomeIcon.jsx";
import ChevronRightIcon from "./icons/ChevronRightIcon.jsx";
import ArchiveIcon from "./icons/ArchiveIcon.jsx";
import TagIcon from "./icons/TagIcon.jsx";


const Sidebar = ({ className, notes }) => {


   const { theme } = useTheme();
   const allTags=notes.flatMap(note => note.tags ?? []);
   const tags=[...new Set(allTags)];

  return (
   <aside className={`flex w-full flex-col p-4  bg-app-background-section 
                      text-app-text text-preset-4 font-medium
                      border-r  border-app-border ${className}`}   >

        
          <img className="w-24 py-3 mb-4"
                src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes"
                 />

        {/* Block All+Archived Notes */}
          <div className="flex flex-col gap-1  border-b  border-app-border ">
            
             <Link  to="/" 
                   className="group flex items-center px-3 py-[10px] gap-2 
                              hover:bg-app-hover-bg rounded-lg 
                              hover:text-app-bright-text" >

               <HomeIcon className=" w-5 group-hover:text-blue-500" />
             
               <p className="">All Notes </p>

                <ChevronRightIcon className=" w-5 ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
               
           
             </Link>

             <Link to="/archived"
                   className="group flex items-center p-3 gap-2 
                             hover:bg-app-hover-bg rounded-lg hover:text-app-bright-text" >

               <ArchiveIcon className=" w-5 group-hover:text-blue-500" />
             
               <p className="ext-preset-4 hover:text-app-bright-text">Archived Notes </p>

                <ChevronRightIcon className="t w-5 ml-auto opacity-0
                                  transition-opacity group-hover:opacity-100" />
               
                </Link>
             
          </div>
         
         {/* Block Teg */}
         <div className="">
           <p className="text-neutral-500 text-preset-4 py-3 pl-2 mb-2">Tags </p>
           <ul className="flex flex-col gap-1">
              {tags.map((tag) => (
                <li key={tag}
                    className="flex w-full">

                   <Link  to={`/tags/${tag}`}
                        className="group flex items-center gap-2 py-[10px] pl-3   hover:bg-app-hover-bg rounded-lg" >     
                      <TagIcon className=" " />
                        {tag}
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