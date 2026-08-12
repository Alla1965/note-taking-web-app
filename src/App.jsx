import { Routes, Route, Link } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';


  const HomePage = lazy(() => import('./pages/HomePage'));
  const SettingPage = lazy(() => import('./pages/SettingPage'));
  import NoteEditor from "./components/NoteEditor.jsx";
  import NotFoundPage from "./pages/NotFoundPage"

 
const App = () => {
   

  return(
   <div className=''>

      <Suspense fallback={<p>Loading...</p>}>
     <Routes>
     
       <Route path="/"              element={<HomePage />} />
       <Route path="/notes/:noteId" element={<HomePage />} />
       <Route path="/setting" element={<SettingPage />} />
       <Route path="*"              element={<NotFoundPage />} 
        />

     </Routes>
     </Suspense>
     </div>  
      )   
    }

export default App;


