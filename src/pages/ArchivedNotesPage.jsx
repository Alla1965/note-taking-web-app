import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import NotesList from "../components/NotesList.jsx";
import NoteEditor from "../components/NoteEditor.jsx";
import NoteActions from "../components/NoteActions.jsx";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient.js";


const ArchivedNotesPage  = () => {


     const handleNoteUpdated =(updatedNote)=> {
             setNotes(previousNotes => 
              previousNotes.map(item =>item.id === updatedNote.id 
               ? { ...item, ...updatedNote }
               :item)) }

     const { notes, setNotes, isLoading, loadError, setLoadError } = useOutletContext();
     const archivedNotes = notes.filter(note => note.isArchived === true);
     const { noteId } = useParams();
     const navigate = useNavigate();
     const isEditorOpen = Boolean(noteId);
     const selectedNote = archivedNotes.find((note) => String(note.id) === String(noteId));
     const displayedNote = noteId ? selectedNote : archivedNotes[0]; 

     const handleNoteDelete =async (noteId)=> {
        try {const {  data, error } = await  supabase.from("notes").delete().eq("id", noteId).select("id");
                       
            if (error) { setLoadError(error.message); return; }
            setNotes(previousNotes => previousNotes.filter(item =>String(item.id) !== String(noteId)  ))
          }
        catch (error) {console.error("Load notes:", error.message);
             setLoadError(error.message); }
       }

        const handleNoteArchive =async (noteId)=> {
              try {const {  data, error } = await  supabase.from("notes").update({ isArchived: true }).eq("id", noteId).select("id, isArchived");
                     
                     if (error) { setLoadError(error.message); return; }
                     
                    if(!data ||data.length === 0){return}
                    handleNoteUpdated(data[0])
                       }
                catch (error) {console.error("Archive note:", error.message);
                     setLoadError(error.message); }
       }

          const handleNoteRestore =async (noteId)=> {
              try {const {  data, error } = await  supabase.from("notes").update({ isArchived: false }).eq("id", noteId).select("id, isArchived");
                     
                     if (error) { setLoadError(error.message); return; }
                        if(!data ||data.length === 0){return}
                         handleNoteUpdated(data[0]);
                          navigate("/");
                       }
                catch (error) {console.error("Restore note:", error.message);
                     setLoadError(error.message); }
                                                    }

     if (isLoading) {return <p>Loading notes…</p>}
     if (loadError !== "") {return <p>Failed to load notes</p>};


  return (
   <div className="flex  w-full bg-app-background text-app-text
                     lg:grid  
                     lg:grid-cols-[290px_minmax(0,1fr)_258px] 
                     h-full min-h-0 overflow-hidden">

       <NotesList notes={archivedNotes}
                  notePath="/archived"
                  className={`${isEditorOpen ? "hidden" : "flex"} lg:flex`}/> 

       {displayedNote ? 
       <NoteEditor onDelete={()=>  displayedNote && handleNoteDelete(displayedNote.id)}
                          onRestore = {()=>  displayedNote && handleNoteRestore(displayedNote.id)}
                          onNoteUpdated={handleNoteUpdated} 
                          key={ displayedNote?.id}
                          className={`${isEditorOpen ? "flex" : "hidden"} lg:flex`}
                          note={displayedNote}
                          isCreating={false} /> 
                  : null }
              
      <NoteActions onDelete={()=> displayedNote && handleNoteDelete(displayedNote.id)} 
                   onRestore = {()=>  displayedNote && handleNoteRestore(displayedNote.id)}
                   className="hidden lg:flex" />
      
          
   </div>
     );
};

export default ArchivedNotesPage ;