import {Link, useNavigate } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";
import TagIcon from "./icons/TagIcon.jsx";
import ClockIcon from "./icons/ClockIcon.jsx";
import MobileNavigation from "./MobileNavigation.jsx";
import EditorNav from "./EditorNav.jsx";

const NoteEditor = ({ note, isCreating, className }) => {

   const { theme } = useTheme();
   // const {fontTheme, setFontTheme,} = useTheme();
   const navigate=useNavigate();
   
    return ( 
        <section className={`w-full min-w-0 flex flex-col  
          gap-4 py-5 px-4 md:py-6 md:px-8 lg:py-5 lg:px-6  
          border-r  border-app-border h-full          
          min-h-0
          overflow-hidden ${className}`} >
          
          <EditorNav />
          
          <h2 className="text-preset-1 text-app-bright-text">
            {isCreating ? "Enter a title…" : note.title}     </h2>

          <ul className="flex flex-col text-preset-5 text-app-bright-text">
            <li className="flex gap-1.5">
                <div className="flex w-[115px] items-center py-1 gap-1.5">
                   <TagIcon />
                   <p>Tags</p>
                      
                </div>
                
                <div className="flex items-center pr-2">
                   {isCreating ? "Add tags separated by commas (e.g. Work, Planning)" : note.tags.join(", ")}
                  
                </div>
            </li>

            <li className="flex gap-1.5">
                <div className="flex w-[115px] items-center py-1 gap-1.5">
                   <ClockIcon />
                   <p>Last edited</p>
                      
                </div>
                <div className="flex  items-center">
                            <div className="text-app-text ">
                           {isCreating ? "Not yet saved" : new Intl.DateTimeFormat("en-GB", {
                           day: "2-digit",
                           month: "short",
                           year: "2-digit",
                          }).format(new Date(note.lastEdited))}
                         
                </div>
                </div>
            </li>   
          </ul>
         
          <div className="text-preset-5 text-app-editor-text whitespace-pre-line flex-1
                      min-h-0
                      overflow-y-auto">
                {isCreating ? "Start typing your note here…" : note.content}
          </div>

           <div className="border-t border-app-border shrink-0 h-[1px]"></div>

           <div className="flex gap-4  w-full text-preset-4 mt-auto"> 
            <button className="hidden w-[99px] lg:flex justify-center items-center py-3 
                              bg-app-hover-bg text-app-text-button rounded-lg
                              hover:bg-blue-500 hover:text-neutral-0 ">
               Save Note
            </button>
            
            <button className="hidden w-[99px] lg:flex justify-center items-center py-3 
                              bg-app-hover-bg text-app-text-button rounded-lg
                              hover:bg-blue-500 hover:text-neutral-0 "
                     onClick={()=> navigate("/")}>
               Cancel
            </button>

           </div>

           <MobileNavigation />

        </section>
        
         );
};

export default NoteEditor;