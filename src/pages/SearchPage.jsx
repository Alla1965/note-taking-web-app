import {Link, useOutletContext} from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";


const SearchPage= () => {
   const { theme  } = useTheme();
  const { notes, searchQuery, setSearchQuery } = useOutletContext();
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchedNotes = normalizedQuery ? notes.filter((note) => 
                        note.isArchived === false && 
                        (note.title?.toLowerCase().includes(normalizedQuery) || 
                        note.content?.toLowerCase().includes(normalizedQuery) || 
                        note.tags?.some(tag => 
                        tag.toLowerCase().includes(normalizedQuery)))) : [];
  return (
    <div className="flex h-full flex-col gap-4 
                       bg-app-background px-4 py-5 text-app-text">
         <img className="flex object-contain object-left bg-app-hover-bg w-full
                         h-[54px] px-4 py-[13px]
                          md:h-[74px] md:px-8 md:py-[23px] lg:hidden "
                src={theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg"}
                alt="Notes"
          />                 
     <h1 className="text-preset-1 text-app-bright-text">Search</h1>
     <input type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title, content, or tags..." 
            className="w-full rounded-lg border border-app-border bg-app-background-section px-4 py-3"
            />
            <ul>
             {searchedNotes.map((note) => (
<li key={note.id}>
  <Link to={`/notes/${note.id}`}>{note.title}</Link>  
</li>
             ))}  
            </ul>
            <p>Found: {searchedNotes.length}</p>
     </div>
  )
  
}
export default SearchPage ;