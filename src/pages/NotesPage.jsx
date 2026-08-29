import { useParams } from "react-router-dom";
import NotesList from "../components/NotesList.jsx";
import NoteEditor from "../components/NoteEditor.jsx";
import NoteActions from "../components/NoteActions.jsx";
import notesData from "../data/notes.json";

const NotesPage = ({ className }) => {
    
     const { noteId } = useParams();
     const isEditorOpen = Boolean(noteId);
 
     const isCreating = noteId === "new";
     const notes = notesData.notes;
     const selectedNote = isCreating
           ? null
           : notes.find((note) => String(note.id) === String(noteId));
      
     const displayedNote = selectedNote ?? notes[0];      
      
  return (
  <div 
         className="flex  w-full bg-app-background text-app-text
                     lg:grid  
                     lg:grid-cols-[290px_minmax(0,1fr)_258px] 
                     h-full min-h-0 overflow-hidden">
       
      <NotesList className={`${isEditorOpen ? "hidden" : "flex"} lg:flex`}/> 

      <NoteEditor className={`${isEditorOpen ? "flex" : "hidden"} lg:flex`}
                 note={displayedNote}
                  isCreating={isCreating} /> 
      <NoteActions className="hidden lg:flex"/>
  </div>
     );
};

export default NotesPage;