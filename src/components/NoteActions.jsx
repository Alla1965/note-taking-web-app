import ArchiveIcon from "./icons/ArchiveIcon.jsx";
import DeleteIcon from "./icons/DeleteIcon.jsx";


const NoteActions = ({ className, onDelete, onArchive, onRestore }) => {

 
   return ( 
    <section className={`flex flex-col pt-5 pl-4 pr-8 gap-3 bg-app-background-section 
               border-r  border-app-border text-preset-4 ${className}`}>

        <button type="button" 
                onClick = {onRestore ? onRestore: onArchive}
                className="flex items-center gap-2 text-app-bright-text py-4 pl-5
                        border border-app-border rounded-lg  hover:bg-app-hover-bg hover:text-app-bright-text">
        <ArchiveIcon className=" w-5 " />
        <span> {onRestore ? "Restore Note": "Archive Note"}</span>
        </button>

        <button  type="button" 
                 onClick={onDelete}
                 className="flex items-center gap-2 text-app-bright-text py-4 pl-5
                        border border-app-border rounded-lg hover:bg-app-hover-bg hover:text-app-bright-text">
        <DeleteIcon className=" w-5 " />
        <span> Delete Note </span>
        </button>

    </section>
   );
};

export default NoteActions;