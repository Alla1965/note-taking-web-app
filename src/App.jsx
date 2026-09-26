import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ColorTheme from "./components/ColorTheme.jsx";
import FontTheme from "./components/FontTheme.jsx";
import PasswordChange from "./components/PasswordChange.jsx";
  const HomePage = lazy(() => import('./pages/HomePage'));
  const SettingPage = lazy(() => import('./pages/SettingPage'));
  // import NoteEditor from "./components/NoteEditor.jsx";
  import NotesPage from "./pages/NotesPage.jsx"
    import ArchivedNotesPage   from "./pages/ArchivedNotesPage.jsx"
  import NotFoundPage from "./pages/NotFoundPage"
  import SignupPage from "./pages/SignupPage.jsx";
  import LoginPage from "./pages/LoginPage.jsx";
   import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
 import ResetPage from "./pages/ResetPage.jsx";
 import SearchPage from "./pages/SearchPage.jsx";
 import { useAuth } from "./contex/AuthContext.jsx";
 
const App = () => {
  const { session, loading } = useAuth(); 
  if(loading){return "Loading..."}

  return(
   <div className=''>

      <Suspense fallback={<p>Loading...</p>}>
     <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset" element={<ResetPage />} />
      
        

         <Route path="/"element={session ? <HomePage /> : <Navigate to="/signup" replace />} >

         <Route index element={<NotesPage />} />
         <Route path="notes/:noteId" element={<NotesPage  />} />
         <Route path="archived" element={<ArchivedNotesPage  />} />
         <Route path="archived/:noteId" element={<ArchivedNotesPage  />} />
           <Route path="tags" element={<NotesPage mobileTagsMode />} />
         <Route path="tags/:tag" element={<NotesPage />} />
          <Route path="search" element={<SearchPage />} />
         <Route path="setting" element={<SettingPage />}>
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


