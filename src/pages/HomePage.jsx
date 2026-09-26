import {useTheme} from "../contex/ThemeContext.jsx"
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient.js";

const HomePage = () => {

     useEffect(() => { 
       const loadNotes = async () => {
          try {const { data, error } = await  supabase.from("notes").select("*");
            if (error) { setLoadError(error.message); return; }
              setNotes(data);
               }
              catch (error) {console.error("Load notes:", error.message);
               setLoadError(error.message); }
                 
             finally {setIsLoading(false)}
             };
        loadNotes();          
     }, []);

    const {resolvedTheme,fontTheme,} = useTheme();
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");  
    const [searchQuery, setSearchQuery] = useState("");
    const [toast, setToast] = useState(null);

    const showToast = (message, actionText, to) => {
           setToast({ message, actionText, to });}

  return (
    <div data-theme={resolvedTheme}
         data-font-theme={fontTheme}
         className="flex flex-col h-screen  bg-app-background text-app-text
                    lg:grid  lg:h-screen lg:overflow-hidden
                    lg:grid-cols-[272px_minmax(0,1fr)]
                    lg:grid-rows-[81px_minmax(0,1fr)]
                    w-full">
       
       {/* Боковая панель SideBar */}

       <Sidebar notes={notes}
                className="hidden lg:flex lg:col-start-1 lg:row-start-1 lg:row-end-3" /> 
       <Header searchQuery={searchQuery} 
               setSearchQuery={setSearchQuery}
               className="hidden lg:flex lg:col-start-2 lg:col-end-3
                          lg:row-start-1 "/> 
     
      <div className="lg:col-start-2 lg:col-end-3 lg:row-start-2
                      w-full h-full min-w-0 min-h-0
                      overflow-hidden">
      <Outlet context={{notes, setNotes, isLoading, loadError,
                        setLoadError, searchQuery, setSearchQuery, showToast}} />

      {toast && (
       <div className="fixed bottom-24 left-4 right-4 z-50 flex items-center
                       gap-3 rounded-lg border border-app-border bg-app-background 
                       px-4 py-3 shadow-lg md:bottom-6 md:left-1/2 md:right-auto 
                       md:-translate-x-1/2"> {toast.message};
        <Link to={toast.to} 
              onClick={() => setToast(null)}>
                {toast.actionText}
        </Link>
        
        </div>
        )}
      </div>
    
    </div>
  ); 
};
export default HomePage;