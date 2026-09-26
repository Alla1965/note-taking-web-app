import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import NotesList from "../components/NotesList.jsx";
import NoteEditor from "../components/NoteEditor.jsx";
import NoteActions from "../components/NoteActions.jsx";

import { supabase } from "../lib/supabaseClient.js";


const NotesPage = ({ mobileTagsMode = false,  tags = []}) => {
     const navigate = useNavigate();
    

     const { noteId, tag } = useParams();
     const { notes, setNotes, isLoading, loadError, setLoadError, searchQuery, showToast } = useOutletContext();
     const allTags = [...new Set(notes.flatMap(note => note.tags ?? []).filter(Boolean))];   
     const activeNotes=notes.filter(note => note.isArchived === false);
     const isEditorOpen = Boolean(noteId);
     const isCreating = noteId === "new";
     const availableTags = [...new Set(notes.flatMap(note => note.tags ?? []))];
     const visibleNotes = tag 
                            ? activeNotes.filter(note => note.tags?.includes(tag))
                            : activeNotes;    
      const normalizedQuery = searchQuery.trim().toLowerCase(); 
                            const searchedNotes = normalizedQuery ? visibleNotes.filter((note) =>
                            note.title?.toLowerCase().includes(normalizedQuery)||
                            note.content?.toLowerCase().includes(normalizedQuery)||
                            note.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))) 
                              : visibleNotes ;                
     const selectedNote = isCreating
           ? null
           : activeNotes.find((note) => String(note.id) === String(noteId));
     const displayedNote = noteId ? selectedNote : visibleNotes[0];  
     const emptyMessage = tag ? `No active notes found with the tag "${tag}". This tag is only used by archived notes.` 
                : "You don't have any notes yet. Start a new note to capture your thoughts and ideas.";

     const handleNoteUpdated =(updatedNote)=> {
             setNotes(previousNotes => 
              previousNotes.map(item =>item.id === updatedNote.id ? { ...item, ...updatedNote }:item)) }


     const handleNoteCreated=(savedNote) => {setNotes(previousNotes => [savedNote, ...previousNotes])}
     
     const handleNoteDelete =async (noteId)=> {
           try {const {  data, error } = await  supabase.from("notes").delete().eq("id", noteId).select("id");
                       
                     if (error) { setLoadError(error.message); return; }
                     if(!data ||data.length === 0){return};
                    setNotes(previousNotes => previousNotes.filter(item =>String(item.id) !== String(noteId)  ));
                     navigate("/");
                       }
                      
                    catch (error) {console.error("Delete note::", error.message);
                     setLoadError(error.message); }
       }

        const handleNoteArchive =async (noteId)=> {
              try {const {  data, error } = await  supabase.from("notes").update({ isArchived: true }).eq("id", noteId).select("id, isArchived");
                    
                     if (error) { setLoadError(error.message); return; }
                    

                    if(!data ||data.length === 0){return}
                   handleNoteUpdated(data[0])
                   
                    showToast("Note archived.", "Archived Notes", "/archived");
                    navigate("/");
                       }
                catch (error) {console.error("Archive note:", error.message);
                     setLoadError(error.message); }
       }

     if (isLoading) {return <p>Loading notes…</p>}
     if (loadError !== "") {return <p>Failed to load notes</p>};


  return (
   <div className="flex  w-full bg-app-background text-app-text
                     lg:grid  
                     lg:grid-cols-[290px_minmax(0,1fr)_258px] 
                     h-full min-h-0 overflow-hidden">

       <NotesList notes={searchedNotes}
                  mobileTagsMode={mobileTagsMode}
                  tags={allTags}
                  emptyMessage={emptyMessage}
                  isCreating={isCreating}
                  className={`${isEditorOpen ? "hidden" : "flex"} lg:flex`}/> 

              {isCreating || displayedNote ? 
       <NoteEditor onDelete={()=> !isCreating && displayedNote && handleNoteDelete(displayedNote.id)}
                   onNoteUpdated={handleNoteUpdated} 
                   onNoteCreated={handleNoteCreated}
                   availableTags={availableTags}
                   onArchive = {()=> !isCreating && displayedNote && handleNoteArchive(displayedNote.id)} 
                   key={isCreating ? "new" : displayedNote?.id}
                   className={`${isEditorOpen ? "flex" : "hidden"} lg:flex`}
                   note={isCreating ? null :displayedNote}
                   isCreating={isCreating} /> 
                  : null }
              
      <NoteActions onDelete={()=> !isCreating && displayedNote && handleNoteDelete(displayedNote.id)} 
                   onArchive = {()=> !isCreating && displayedNote && handleNoteArchive(displayedNote.id)} 
                   className="hidden lg:flex" />
      
          
   </div>
     );
};

export default NotesPage;