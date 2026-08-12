import { useSearchParams, Link, useLocation, useParams } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx"
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import NotesList from "../components/NotesList.jsx";
import NoteEditor from "../components/NoteEditor.jsx";
import NoteActions from "../components/NoteActions.jsx";
import notesData from "../data/notes.json";

const HomePage = () => {

   const [searchParams, setSearchParams] = useSearchParams();
   console.log("searchParams", searchParams);
  
  const name = searchParams.get("name") ?? "";
  const { theme, toggleTheme } = useTheme();
  console.log("theme", theme);
  const { noteId } = useParams();
  const isEditorOpen = Boolean(noteId);
  const isCreating = noteId === "new";
  const notes = notesData.notes;
  const selectedNote = isCreating
  ? null
  : notes.find((note) => String(note.id) === String(noteId));
      
   const displayedNote = selectedNote ?? notes[0];      
      
  return (
    <div data-theme={theme}
         className="flex flex-col h-screen  bg-app-background text-app-text
                    lg:grid  lg:h-screen lg:overflow-hidden
                     lg:grid-cols-[272px_290px_auto_258px]
                    lg:grid-rows-[81px_minmax(0,1fr)]
                     w-full md:flex font-inter">
       
       {/* Боковая панель SideBar */}

       <Sidebar className="hidden lg:flex lg:col-start-1 lg:row-start-1 lg:row-end-3" /> 
       <Header className="hidden lg:flex lg:col-start-2 lg:col-end-5 lg:row-start-1 "/> 
       <NotesList className={`${isEditorOpen ? "hidden" : "flex"}
                                lg:flex lg:col-start-2 lg:col-end-3 lg:row-start-2`}  /> 
       <NoteEditor className={`${isEditorOpen ? "flex" : "hidden"}
                               lg:flex lg:col-start-3 lg:col-end-4 lg:row-start-2`}
                   note={displayedNote}
                    isCreating={isCreating}
                   /> 
       <NoteActions className="hidden lg:flex lg:col-start-4 lg:col-end-5 lg:row-start-2" />
       
    </div>
  ); 
};
export default HomePage;