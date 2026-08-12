import {Link } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx";
import ArchiveIcon from "./icons/ArchiveIcon.jsx";
import DeleteIcon from "./icons/DeleteIcon.jsx";
const NoteActions = ({ className }) => {

   const { theme, toggleTheme } = useTheme();

   return ( 
    <section className={`flex flex-col pt-5 pl-4 gap-3 bg-app-background-section 
               border-r  border-app-border text-preset-4 ${className}`}>

        <div className="flex items-center gap-2 text-app-bright-text py-4 pl-5
                        border border-app-border rounded-lg  hover:bg-app-hover-bg hover:text-app-bright-text">
        <ArchiveIcon className=" w-5 " />
        <p> Archive Note </p>
        </div>

        <div className="flex items-center gap-2 text-app-bright-text py-4 pl-5
                        border border-app-border rounded-lg hover:bg-app-hover-bg hover:text-app-bright-text">
        <DeleteIcon className=" w-5 " />
        <p> Delete Note </p>
        </div>

    </section>
   );
};

export default NoteActions;