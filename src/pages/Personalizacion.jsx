import React from "react";
import '../styles/Personalizacion.css';
import { useState } from "react";
import SideBar from "../components/SideBar";
import MenuIcon from '@mui/icons-material/Menu';
import Pagination from '@mui/material/Pagination';

function Personalizacion () {
  /* Hook para controlar si el sideBar es visible o no lo es */
  const [showSidebar, setShowSidebar] = useState(false);
  const [rewardShowing, setRewardShowing] = useState('piezas');
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page

  const chunkSize = 3; // Number of elements per chunk

  // Function to split the array into chunks
  const chunkArray = (arr, size) => {
    return arr.reduce((chunks, el, i) => {
      if (i % size === 0) {
        chunks.push([el]);
      } else {
        chunks[chunks.length - 1].push(el);
      }
      return chunks;
    }, []);
  };

  const piezasPreview = [
     /*{ modelo: 'alpha', king: alphaK, queen: alphaQ },
    { modelo: 'cardinal', king: cardinalK, queen: cardinalQ },
    { modelo: 'celtic', king: celticK, queen: celticQ },
    { modelo: 'chess7', king: chess7K, queen: chess7Q },
    { modelo: 'chessnut', king: chessnutK, queen: chessnutQ },
    { modelo: 'companion', king: companionK, queen: companionQ },
    { modelo: 'fantasy', king: fantasyK, queen: fantasyQ },
    { modelo: 'fresca', king: frescaK, queen: frescaQ },
    { modelo: 'governor', king: governorK, queen: governorQ },
    { modelo: 'kosal', king: kosalK, queen: kosalQ },
    { modelo: 'leipzig', king: leipzigK, queen: leipzigQ },
    { modelo: 'mpchess', king: mpchessK, queen: mpchessQ },
    { modelo: 'pixel', king: pixelK, queen: pixelQ },
    { modelo: 'maestro', king: maestroK, queen: maestroQ },
    { modelo: 'anarcandy', king: anarcandyK, queen: anarcandyQ }, */
  ];

  const partidaChunks = chunkArray(piezasPreview, chunkSize);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

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
      <div className="containerPersonalizacion">
        <div className="containerPersonalizacion center">
          <div className="menuDeslizante">
            {/* Contenido a mostrar (piezas / emoticonos) */}
            <div>
              <button className={rewardShowing == 'piezas' ? "contenidoButton selected" : "contenidoButton"}
                onClick={() => setRewardShowing('piezas')}>
                  Piezas
              </button>
              <button className={rewardShowing == 'emoticonos' ? "contenidoButton selected" : "contenidoButton"} 
                onClick={() => setRewardShowing('emoticonos')}>
                  Emoticonos
              </button>
            </div>
            {/* Eleccion de piezas / Emoticonos */}
            {rewardShowing === 'piezas' ? (
              <div className="menuDeslizanteContenido">
                {partidaChunks[currentPage - 1]?.map((piezas, i) => (
                  <div key={i} /* className={`historialPartidas ${piezas.estado}`} */>
                    {/* <p className="historialPartidas Estado">{partida.estado}</p>
                    <p className="historialPartidas Fecha">{partida.fecha}</p>
                    <p className="historialPartidas Puntos">Puntos otorgados: {partida.puntos}</p> */}
                    {/* <img className = "imagenBattlePass" src={piezas.king} alt='Pieza' />
                    <img className = "imagenBattlePass" src={piezas.queen} alt='Pieza' /> */}
                  </div>
                ))}
              </div> 
            ) : (
              <div className="menuDeslizanteContenido">
                {partidaChunks[currentPage - 1]?.map((piezas, i) => (
                  <div key={i} /* className={`historialPartidas ${piezas.estado}`} */>
                  </div>
                ))}
              </div> 
            )}
            {/* Pagination component to switch between pages */}
            <div className="menuDeslizantePagina">
              <Pagination
                count={partidaChunks.length}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalizacion;