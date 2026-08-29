import { useSearchParams, Link, useLocation, useParams } from "react-router-dom";
import {useTheme} from "../contex/ThemeContext.jsx"
import { Outlet } from "react-router-dom";
import SettingMenu from "../components/SettingMenu.jsx"
import ColorTheme from "../components/ColorTheme.jsx"

const SettingPage = () => {
   //  const {fontTheme, setFontTheme,} = useTheme();
    const location=useLocation();
    const isDetailOpen = location.pathname !== "/setting";
    
    return(
         
<div className=" lg:grid lg:grid-cols-[258px_minmax(0,1fr)] h-full min-h-0">
   
    <div className={`h-full
min-h-0 ${isDetailOpen ? "hidden lg:block" : "block"} `}>
      <SettingMenu /> 
    </div>

   <div className={`${isDetailOpen ? "block " : "hidden lg:block"} h-full min-h-0`} > 
      <Outlet  />
   </div>

</div>
    
   )
}
export default SettingPage;