import { Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import ColorTheme from "./components/ColorTheme.jsx";
import FontTheme from "./components/FontTheme.jsx";
import PasswordChange from "./components/PasswordChange.jsx";
  const HomePage = lazy(() => import('./pages/HomePage'));
  const SettingPage = lazy(() => import('./pages/SettingPage'));
  import NoteEditor from "./components/NoteEditor.jsx";
  // import NotesPage from "./components/"
  import NotesPage from "./pages/NotesPage.jsx"
  import NotFoundPage from "./pages/NotFoundPage"

 
const App = () => {
   

  return(
   <div className=''>

      <Suspense fallback={<p>Loading...</p>}>
     <Routes>
     
     

       {/* <Route path="/notes/:noteId" element={<HomePage />} /> */}

         <Route path="/"              element={<HomePage />} >

         <Route index element={<NotesPage />} />
         <Route path="/notes/:noteId" element={<NotesPage  />} />

         <Route path="/setting" element={<SettingPage />}>
          <Route path="theme" element={<ColorTheme />} />
           <Route path="font" element={<FontTheme />} />
            <Route path="password" element={<PasswordChange />} />
        </Route>

         </Route>
      

       <Route path="*"              element={<NotFoundPage />} 
        />
     </Routes>

     </Suspense>
     </div>  
      )   
    }

export default App;


