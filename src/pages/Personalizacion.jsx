import React from "react";
import '../styles/Personalizacion.css';
import { useState } from "react";
import SideBar from "../components/SideBar";
import MenuIcon from '@mui/icons-material/Menu';

function Personalizacion () {
  /* Hook para controlar si el sideBar es visible o no lo es */
  const [showSidebar, setShowSidebar] = useState(false);

  return(
    <div className="fondoPersonalizacion">
      {/* Menú desplegable (sideBar) */}
      <div className={showSidebar ? "sidePersonalizacion open" : "sidePersonalizacion"}>
        <SideBar setShowSidebar={setShowSidebar}/>
      </div>
      <div className="titlePersonalizacion">
        {/* Botón para desplegar el sidebar */}
        <button className={!showSidebar ? "sideMenuButtonPersonalizacion" : "sideMenuButtonPersonalizacion hidden"} 
          onClick={() => setShowSidebar(true)}>
          <MenuIcon sx={{
            color: '#fff',
            backgroundColor: 'transparent',
            height: 52,
            width: 52,
          }} />
        </button>
        {/* Título de la página */}
        <h1 className="pageTitlePersonalizacion">PERSONALIZACION</h1>
      </div>
    </div>
  );
}

export default Personalizacion;