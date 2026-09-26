import {Link, NavLink } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";
// import { useState } from "react";
// import Header from "./Header.jsx"
import MobileNavigation from "./MobileNavigation.jsx";
import TagIcon from "./icons/TagIcon.jsx";



const NotesList = ({ notes, tags = [], mobileTagsMode = false, className, notePath = "/notes",
    isSearchMode = false, searchQuery, setSearchQuery, 
    emptyMessage = "You don't have any notes yet. Start a new note to capture your thoughts and ideas.", 
    isCreating = false}) => {

   const { theme } = useTheme();
   
   const sortedNotes = [...notes].sort((a,b) => Date.parse(b.lastEdited) - Date.parse(a.lastEdited));

   const handleNoteDelete =async (noteId)=> {
      try {const {  error } = await  supabase.from("notes").delete().eq("id", noteId);
                       
                     if (error) { setLoadError(error.message); return; }
                    setNotes(previousNotes => previousNotes.filter(item =>String(item.id) !== String(noteId)  ))
                       }
                    catch (error) {console.error("Load notes:", error.message);
                     setLoadError(error.message); }
       }

  return ( 
   <section className={`w-full min-w-0 flex flex-col 
                             border-r  border-app-border h-full min-h-0 lg:py-5 lg:pl-8 lg:pr-4
                             overflow-hidden ${className} `}>
                           
       <Link  to="/notes/new" aria-label="Create new note"
              className="hidden lg:flex lg:justify-center lg:rounded-lg lg:mb-4
                          lg:bg-blue-500 lg:text-neutral-0 lg:py-3 ">
             + Create New Note
       </Link>

       <img className="flex object-contain object-left bg-app-hover-bg w-full
                         h-[54px] px-4 py-[13px]
                          md:h-[74px] md:px-8 md:py-[23px] lg:hidden "
                src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes"
          />
       
          <div className={`w-full min-w-0 flex flex-col  bg-app-background
                             gap-4 py-5 px-4 md:py-6 md:px-8 lg:p-0 
                              h-full min-h-0 rounded-t-lg
                             overflow-hidden ${className}`}>
       {isSearchMode && ( 
         <div className="flex flex-col gap-4">
         <h1 className="text-preset-1 text-app-bright-text">Search</h1>
          <input type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title, content, or tags..." 
            className="w-full rounded-lg border border-app-border bg-app-background-section px-4 py-3"
            />
            <p>All notes matching "Dev" are displayed below.</p>
            </div>
         )}


         <div className={`${mobileTagsMode ? "flex" : "hidden"} min-h-0 flex-1 flex-col 
                         rounded-t-xl bg-app-background px-4 py-5 lg:hidden
                         md:px-8 md:py-6`}>
           <h1 className="mb-1 text-preset-1 text-app-bright-text">Tags</h1>   
           <ul className={`${mobileTagsMode ? "flex" : "hidden"} lg:hidden flex-col `}>
                    {tags.map((tag) => (
          <li key={tag} className="border-b border-app-border last:border-b-0 ">
              <Link to={`/tags/${encodeURIComponent(tag)}`} 
                  className="flex items-center gap-2 py-3 md:py-[15.5px] hover:bg-app-hover-bg">
                <TagIcon className="h-5 w-5" />
               <span className="text-preset-4">{tag}</span>  
              </Link>
              
          </li>))}
      </ul>
       </div>
       
       {/* Block ALL NOTES */}
       <div className={`${mobileTagsMode ? "hidden lg:flex" : "flex"} min-h-0 flex-1 flex-col 
                         rounded-t-xl bg-app-background  `}>
           {!mobileTagsMode && <h1 className="mb-4 text-preset-1 text-app-bright-text
                                lg:hidden">All notes</h1>}
            {isCreating && <li className="hidden rounded-lg bg-app-hover-bg p-2 text-preset-3 lg:block">Untitled Note</li>}
           <ul className={`${mobileTagsMode ? "hidden lg:flex" : "flex"} notes-scrollbar  
                      relative  flex-col min-h-0 flex-1 
                      gap-1 list-none m-0 
                      overflow-y-auto touch-pan-y`}>

                     {sortedNotes.length===0 ? 

                           <li className="rounded-lg bg-app-hover-bg p-2 text-preset-6 text-app-text">{emptyMessage}</li>
                        : sortedNotes.map((sortedNote) => (

                          <li key={sortedNote.id}
                             className="flex flex-col p-2 border-b border-app-border
                                          lg:shrink-0">

                         <NavLink  to={`${notePath}/${sortedNote.id}`}
                                    className={({isActive})=>` flex flex-col  gap-3
                                    hover:bg-app-hover-bg rounded-lg ${isActive ? "bg-app-hover-bg" : ""}`} > 

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
 
                         </NavLink> 

                           </li>
               
                                                          )                                                       
                                         )
                                                          }

       </ul>
       </div>

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
       </div>
    </section>
     );
};

export default NotesList;