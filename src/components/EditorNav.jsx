import { useNavigate} from "react-router-dom";
import DeleteIcon from "../components/icons/DeleteIcon.jsx"
import ArchiveIcon from "../components/icons/ArchiveIcon.jsx"
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon.jsx"

const EditorNav = () => {

    const navigate=useNavigate();

  return (
    <nav className=" h-[30px] md:h-[34px] border-b  border-app-border text-preset-5 flex justify-between
                    items-start lg:hidden">

        <button className="flex items-center gap-1 w-20"
                type="button"
                onClick={()=> navigate("/")}>
               <ArrowLeftIcon />
               <span className="text-preset-5"> Go Back</span>
        </button>

        <ul className="flex  gap-4  text-app-text-button items-start">
            <li className="flex flex-1 justify-center items-center flex-col md:gap-1 text-app-text  
                            hover:text-blue-500">
                 <button type="button"
                         aria-label="Delete note">
                    <DeleteIcon className="w-[18px] h-[18px]"/>
                 </button>               
                
            </li>

                  <li className="flex flex-1 justify-center items-center md:flex-col md:gap-1 text-app-text  
                    hover:text-blue-500"> 
                    <button type="button"
                         aria-label="Archive note">
                        <ArchiveIcon  className="w-[18px] h-[18px]" />
                    </button>  
            </li>
            
             <li className="  m-auto text-app-text  
                    hover:text-blue-500"> 
                    <button className=" w-[45px]  "
                             type="button"
                             onClick={()=> navigate("/")}>
                        Cancel
                     </button>
                
            </li>
            <li className=" m-auto text-app-text  
                    hover:text-blue-500"> 
                
               <button type="button"
                       className=" w-[67px]  ">
                   Save Note
               </button>

            </li>
           
        </ul>
        
    </nav>
    );
};

export default EditorNav;