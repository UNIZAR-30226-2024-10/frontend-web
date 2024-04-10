import React from "react";
import { useState } from "react";
import '../styles/Arenas.css'
import SideBar from "../components/SideBar";
import MenuIcon from '@mui/icons-material/Menu';


function Arenas() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="background-arenas">
      <div className={showSidebar ? "sideArenas open" : "sideArenas"}>
        <SideBar setShowSidebar={setShowSidebar}/>
      </div>
      <div className="arenas-container">
        {/* Botón para desplegar el sidebar */}
        <button className={!showSidebar ? "sideMenuButton" : "sideMenuButton hidden"} onClick={() => setShowSidebar(true)}>
          <MenuIcon sx={{
            color: '#fff',
            backgroundColor: 'transparent',
            height: 52,
            width: 52,
          }} />
        </button>
        <h1 className="pageTitle">ARENAS DE JUEGO</h1>
        <div className="arenas-container center">
          
        </div>
      </div>
    </div>
  );
}

export default Arenas;