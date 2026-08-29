import { Link, useParams } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx"
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import notesData from "../data/notes.json";

const HomePage = () => {
  //  const { theme, resolvedTheme } = useTheme();
  //  const {fontTheme, setFontTheme,} = useTheme();
   const {resolvedTheme,fontTheme,} = useTheme();

  //  const { resolvedTheme } = useTheme();
   const notes = notesData.notes;
        
      
  return (
    <div data-theme={resolvedTheme}
         data-font-theme={fontTheme}
         className="flex flex-col h-screen  bg-app-background text-app-text
                    lg:grid  lg:h-screen lg:overflow-hidden
                    lg:grid-cols-[272px_minmax(0,1fr)]
                    lg:grid-rows-[81px_minmax(0,1fr)]
                    w-full">
       
       {/* Боковая панель SideBar */}

       <Sidebar className="hidden lg:flex lg:col-start-1 lg:row-start-1 lg:row-end-3" /> 
       <Header className="hidden lg:flex lg:col-start-2 lg:col-end-3
                          lg:row-start-1 "/> 
     
      <div className="lg:col-start-2 lg:col-end-3 lg:row-start-2
                      w-full h-full min-w-0 min-h-0
                      overflow-hidden">
      <Outlet />
      </div>
    
    </div>
  ); 
};
export default HomePage;