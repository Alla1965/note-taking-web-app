import {Link } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";
import notesData from "../data/notes.json";
import Header from "./Header.jsx"
import MobileNavigation from "./MobileNavigation.jsx";



const NotesList = ({ className }) => {

   const { theme } = useTheme();
   // const {fontTheme, setFontTheme,} = useTheme();
   const notes = notesData.notes;
   const sortedNotes = [...notes].sort((a,b) => Date.parse(b.lastEdited) - Date.parse(a.lastEdited));

  return ( 
    <section className={`flex flex-col  min-h-0 w-full
                         gap-4 py-5 px-4 md:py-6 md:px-8 lg:pt-5 lg:pr-4 lg:pl-8 
                          h-full  min-w-0 
                        border-r border-app-border ${className}`}>
                           
       <Link  to="/notes/new" aria-label="Create new note"
              className="hidden lg:flex lg:justify-center lg:rounded-lg
                          lg:bg-blue-500 lg:text-neutral-0
                          lg:py-3 ">
          + Create New Note
       </Link>

         <img className="flex object-contain object-left bg-app-hover-bg w-full
                         h-[54px] px-4 py-[13px]
                          md:h-[74px] md:px-8 md:py-[23px] lg:hidden "
                src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes"
          />

       <ul className="notes-scrollbar relative  flex flex-col min-h-0 flex-1 
                      gap-1 list-none m-0 p-0 
                      overflow-y-auto touch-pan-y">
            {sortedNotes.map((sortedNote) => (
                <li key={sortedNote.id}
                    className=" border-b border-app-border  lg:shrink-0">

                   <Link  to={`/notes/${sortedNote.id}`}
                   className=" flex flex-col gap-3  p-2 hover:bg-app-hover-bg rounded-lg" > 

                     <div className="text-preset-3">
                        {sortedNote.title}
                     </div>

                     <div className="flex gap-1">
                     {sortedNote.tags.map((tag) => (
                       <span className="bg-app-surface text-app-bright-text rounded-sm
                                        text-preset-6 px-1.5 py-0.5" key={tag}> {tag} </span>
                      )) }
                      </div>

                      <div className="text-app-text text-preset-6">
                         
                         {new Intl.DateTimeFormat("en-GB", {
                           day: "2-digit",
                           month: "short",
                           year: "2-digit",
                          }).format(new Date(sortedNote.lastEdited))}
                         
                      </div>
 
                   </Link> 

                </li>
        ))}

       </ul>

        <Link to="/notes/new" aria-label="Create new note"
                className="flex items-center justify-center m-auto w-16 h-16
                          absolute bottom-28 right-9
                          bg-blue-500 text-neutral-0 lg:hidden rounded-full">
             <img className="w-8 h-8  "
                src="/icon-plus.svg"
                alt="Notes"
                 />
        </Link>

       <MobileNavigation />
    </section>
     );
};

export default NotesList;