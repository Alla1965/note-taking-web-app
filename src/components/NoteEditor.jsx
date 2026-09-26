import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {useTheme} from "../contex/ThemeContext.jsx";
import TagIcon from "./icons/TagIcon.jsx";
import ClockIcon from "./icons/ClockIcon.jsx";
import MobileNavigation from "./MobileNavigation.jsx";
import EditorNav from "./EditorNav.jsx";
import { supabase } from "../lib/supabaseClient.js";

const NoteEditor = ({ note, isCreating, className, onNoteUpdated, 
                     onNoteCreated, onDelete, onRestore, onArchive, availableTags = [] }) => {

   const [title, setTitle] = useState(isCreating ? "" : (note?.title ?? ""));
   const [content, setContent] = useState(isCreating ? "" : (note?.content ?? ""));
   const [selectedTags, setSelectedTags] = useState(isCreating ? [] : (note?.tags ?? []));
   const [tagDraft, setTagDraft] = useState("");
   const [isSaving, setIsSaving] = useState(false);
   const [saveError, setSaveError] = useState("");
   const navigate=useNavigate();
   const { theme } = useTheme();

   const handleTagKeyDown = (event) => {
   if (event.key !== "Enter") return;
   event.preventDefault();
   const newTag = tagDraft.trim();
   if (!newTag) return;
   const alreadyExists = selectedTags.some(tag => tag.toLowerCase() === newTag.toLowerCase());
   if (!alreadyExists) setSelectedTags(previous => [...previous, newTag]);
   setTagDraft("");
   }

   const handleTagChange = (event) => {
      const value = event.target.value;
      setTagDraft(value);
      const existingTag = availableTags.find(tag => tag.toLowerCase() === value.trim().toLowerCase());
      if (existingTag && !selectedTags.includes(existingTag)) {
          setSelectedTags(previous => [...previous, existingTag]);
       setTagDraft("");}}

      const  handleSave = async(event) => { 
         event.preventDefault();
         setSaveError("")
         
             if (!title.trim()) { setSaveError("Enter a title"); 
               return; } 
              setIsSaving(true);
             try {const { data, error } = await supabase.auth.getUser();
                        if (error) { setSaveError(error.message); return; }
                        if (!data.user) { setSaveError("Log in to your account"); return; }
                     const tags=selectedTags;
                     if (isCreating) 
                     {const newNote = {title: title.trim(),content: content,user_id: data.user.id, tags: tags};
                      const insertResult = await  supabase.from("notes").insert(newNote).select().single();   
                       if (insertResult.error) { setSaveError(insertResult.error.message); return; }
                      onNoteCreated(insertResult.data);
                     //  insertResult.data.id;
                  }
                     else 
                     { const updatedNote={title: title.trim(),content: content,
                        lastEdited: new Date().toISOString(), tags: tags};
                       const updateResult = await  supabase.from("notes").update(updatedNote).eq("id", note.id); 
                          if (updateResult.error) { setSaveError(updateResult.error.message); return; }
                          onNoteUpdated({ ...updatedNote, id: note.id });
                           }} 
                    
                               
                       catch (error) {console.error("Save note:", error.message);
                        
                         setSaveError(error.message); }
                           
                       finally {setIsSaving(false)}

            } ;
  
    return ( 
     
        
   <section className={`w-full min-w-0 flex flex-col 
                             border-r  border-app-border h-full min-h-0
                             overflow-hidden ${className} bg-app-hover-bg`}> 

             <img className="flex object-contain object-left  w-full
                         h-[54px] px-4 py-[13px]
                          md:h-[74px] md:px-8 md:py-[23px] lg:hidden "
                  src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                  alt="Notes"/> 

          <div className={`w-full min-w-0 flex flex-col  bg-app-background
                             gap-4 py-5 px-4 md:py-6 md:px-8 lg:py-5 lg:px-6  
                             border-r  border-app-border h-full min-h-0 rounded-t-lg
                             overflow-hidden ${className}`}>
          <EditorNav onDelete={onDelete} 
                     onSave={handleSave}  
                     isSaving={isSaving}
                     onRestore={onRestore}
                     onArchive={onArchive}
                     isCreating={isCreating}
                     />
          
                 <input placeholder="Enter a title…" 
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="text-preset-1 text-app-bright-text
                            placeholder:text-app-bright-text"/>
              

          <ul className="flex flex-col text-preset-5 text-app-bright-text">

            <li className="flex items-center gap-1.5">

                <div className="flex w-[115px] items-center py-1 gap-1.5 shrink-0">
                   <TagIcon />
                   <p>Tags</p>
                      
                </div>

                <div className="flex flex-1 flex-wrap items-center gap-1">
               {selectedTags.length > 0 && (
               <div className="flex flex-wrap gap-1">
                {selectedTags.map((tag) => (<span key={tag} className="bg-app-surface text-app-bright-text rounded-sm px-1.5 py-0.5">{tag}</span>))}
               </div>)}
                <input list="available-tags"
                       value={tagDraft}
                       onChange={handleTagChange}
                       onKeyDown={handleTagKeyDown}
                       placeholder={selectedTags.length === 0 ? "Select or enter a tag" : ""}
                       aria-label="Tags"
                       className={selectedTags.length > 0 ?
                                 "leading-6 text-preset-5 p-0 border-0 h-6 w-4 min-w-0 flex-none bg-transparent outline-none focus:w-20" 
                                 : "leading-6 text-preset-5 p-0 border-0 h-6 min-w-[120px] flex-1 bg-transparent outline-none  placeholder:text-neutral-400"} />

                 <datalist id="available-tags">
                  {availableTags.map(tag => <option key={tag} value={tag} />)}
                </datalist>
   
                </div>
               
            </li>

            <li className="flex gap-1.5 border-b border-app-border pb-4">
                <div className="flex w-[115px] items-center py-1 gap-1.5 shrink-0">
                   <ClockIcon />
                   <p>Last edited</p>
                      
                </div>
                <div className="flex  items-center ">
                            <div className="text-app-text ">
                           {isCreating ? <span className="h-6 leading-6 text-preset-5 text-preset-5 text-neutral-400">Not yet saved</span> : new Intl.DateTimeFormat("en-GB", {
                           day: "2-digit",
                           month: "short",
                           year: "2-digit",
                          }).format(new Date(note.lastEdited))}
                         
                </div>
                </div>
            </li>  

          </ul>
         
          <textarea placeholder="Start typing your note here…" 
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    className="text-preset-5 text-app-editor-text whitespace-pre-line 
                    flex-1 min-h-0  overflow-y-auto resize-none">
           </textarea>

           {/* <div className="border-t border-app-border shrink-0 h-[1px]"></div> */}

           <div className="flex gap-4  w-full text-preset-4 mt-auto"> 

            {saveError &&  <p role="alert">{saveError}</p>}
            <button onClick={handleSave}
                    disabled={isSaving}
                    className="hidden w-[99px] lg:flex justify-center items-center py-3 
                              bg-app-hover-bg text-app-text-button rounded-lg
                             bg-blue-500 text-neutral-0 hover:cursor-pointer">
               Save Note
            </button>
            
            <button className="hidden w-[99px] lg:flex justify-center items-center py-3 
                              bg-app-hover-bg text-app-text-button rounded-lg
                              hover:bg-blue-500 hover:text-neutral-0 hover:cursor-pointer"
                     onClick={()=> navigate("/")}>
               Cancel
            </button>

           </div>

           <MobileNavigation />
           </div>
</section>
    
       
         );
};

export default NoteEditor;