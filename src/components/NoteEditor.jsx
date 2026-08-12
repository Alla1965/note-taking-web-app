import {Link, useNavigate } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";
// import notesData from "../data/notes.json";
import TagIcon from "./icons/TagIcon.jsx";
import ClockIcon from "./icons/ClockIcon.jsx";

const NoteEditor = ({ note, isCreating, className }) => {

   const { theme, toggleTheme } = useTheme();
   // const notes = notesData.notes;
   const navigate=useNavigate();
 
   
    return ( 
        <section className={`w-full min-w-0 flex flex-col  gap-4 py-5 px-6 border-r  border-app-border ${className}`} >
          <h2 className="text-preset-1 text-app-bright-text">
            {isCreating ? "Enter a title…" : note.title}
            
          </h2>

          <ul className="flex flex-col text-preset-6 text-app-bright-text">
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
                            <div className="text-app-text text-preset-6">
                           {isCreating ? "Not yet saved" : new Intl.DateTimeFormat("en-GB", {
                           day: "2-digit",
                           month: "short",
                           year: "2-digit",
                          }).format(new Date(note.lastEdited))}

{/*                          
                         {new Intl.DateTimeFormat("en-GB", {
                           day: "2-digit",
                           month: "short",
                           year: "2-digit",
                          }).format(new Date(note.lastEdited))} */}
                         
                      </div>
                </div>
            </li>   
          </ul>
         
          <div className="text-preset-5 text-app-editor-text whitespace-pre-line">
                {isCreating ? "Start typing your note here…" : note.content}
          </div>

           <div className="border-t border-app-border  h-[1px]"></div>

           <div className="flex gap-4  w-full text-preset-4 mt-auto"> 
            <button className="w-[99px] flex justify-center items-center py-3 
                              bg-app-hover-bg text-app-text-button rounded-lg
                              hover:bg-blue-500 hover:text-neutral-0 ">
               Save Note
            </button>
            
            <button className="w-[99px] flex justify-center items-center py-3 
                              bg-app-hover-bg text-app-text-button rounded-lg
                              hover:bg-blue-500 hover:text-neutral-0 "
                     onClick={()=> navigate("/")}>
               Cancel
            </button>

           </div>
        </section>
        
         );
};

export default NoteEditor;