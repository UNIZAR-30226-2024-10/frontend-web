import React from "react";
import { useState } from "react";
import '../styles/Arenas.css'
import SideBar from "../components/SideBar";
import MenuIcon from '@mui/icons-material/Menu';
import Madera from '../images/boards/madera.png';
import Marmol from '../images/boards/marmol.png';
import Oro from '../images/boards/oro.png';
import Diamante from '../images/boards/diamante.png';
import Esmeralda from '../images/boards/esmeralda.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Tooltip } from "@mui/material";

function Arenas() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [hoveredArena, setHoveredArena] = useState(null);
  const [arenaPopUp, setArenaPopUp] = useState({
    showArena: '',
    showArenaStr : '',
    showArenaElo : '',
    showPopUp : false,
  });
  
  const arenas = [
    {img : Madera, str : 'MADERA', elo : '0 - 199'}, 
    {img : Marmol, str : 'MARMOL', elo : '200 - 399'}, 
    {img : Oro, str : 'ORO',  elo : '400 - 599'}, 
    {img : Esmeralda, str : 'ESMERALDA', elo : '600 - 799'}, 
    {img : Diamante, str : 'DIAMANTE', elo : '800 - 1000'},
  ];

  return (
    <div className="background-arenas">
      <div className={showSidebar ? "sideArenas open" : "sideArenas"}>
        <SideBar setShowSidebar={setShowSidebar}/>
      </div>
      <div className="titleArenas">
        {/* Botón para desplegar el sidebar */}
        <button className={!showSidebar ? "sideMenuButton" : "sideMenuButton hidden"} onClick={() => setShowSidebar(true)}>
          <MenuIcon sx={{
            color: '#fff',
            backgroundColor: 'transparent',
            height: 52,
            width: 52,
          }} />
        </button>
        <h1 className="pageTitleArenas">ARENAS DE JUEGO</h1>
      </div>
      <div className="arenas-container">
        {!arenaPopUp.showPopUp && 
          <div className="arenas-container center">
            {arenas.map((arena, index) => (
              <div key={index} className="lista-arenas" onMouseEnter={() => setHoveredArena(index)} onMouseLeave={() => setHoveredArena(null)}>
                <button className="boton-arenas" 
                  onClick={() => setArenaPopUp({ showArena : arena.img, showArenaStr : arena.str, showArenaElo : arena.elo, showPopUp : true })}>
                  <img className="imagenArena" src={arena.img} alt={`Tablero ${index}`} />
                </button>
                {hoveredArena === index && 
                  <div className="message">
                    Arena {index + 1}
                  </div>}
              </div>
            ))}
          </div>
        }
        {arenaPopUp.showPopUp && 
          <div className="arenas-container center">
            {/* Botón para volver hacia atrás */}
            <div className="atras">
              <button className="atras-boton" onClick={() => setArenaPopUp({ showArena : '', showArenaStr : '', showArenaElo : '', showPopUp : false })}>
                <Tooltip title="Atrás">
                  <ArrowBackIosNewIcon sx={{
                    height: 32,
                    width: 32,
                    color: 'white',
                  }}/>
                </Tooltip>
              </button>
            </div>
            {/* Información acerca de la arena */}
            <div className="arenaInfo">
              <div className="arenaInfo text">
                <h2>ARENA DE {arenaPopUp.showArenaStr}</h2>
                <ul className="arenaInfo list">
                  <li>Elo requerido: {arenaPopUp.showArenaElo}</li>
                </ul>
              </div>
            </div>
            {/* Arena en grande */}
            <div className="arenaPopUp">
              <img className="imagenPopUp" src={arenaPopUp.showArena} alt='arena' />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Arenas;