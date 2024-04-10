import React from "react";
import { useState, useRef, useEffect } from "react";
import '../styles/Arenas.css'
import SideBar from "../components/SideBar";
import MenuIcon from '@mui/icons-material/Menu';
import Tablero from '../components/Tablero';

function Arenas() {
  const [showSidebar, setShowSidebar] = useState(false);
  const arenasRef = useRef(null);

  const arenas = ['Madera', 'Mármol', 'Oro', 'Esmeralda', 'Diamante'];

  /* arenasRef.current.scrollTop = arenasRef.current.scrollHeight; */

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
          <ul className="arenasList" ref={arenasRef}>
            {/* Listado de las arenas */}
            {arenas.reverse().map((arena, index) => (
              <li key={index}>
                <div className="arena">
                  <Tablero />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Arenas;