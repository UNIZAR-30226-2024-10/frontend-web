import React from "react";
import '../styles/Historial.css'
import { useState } from "react";
import SideBar from "../components/SideBar";
import MenuIcon from '@mui/icons-material/Menu';
import Pagination from '@mui/material/Pagination';

function Historial() {
  const [showSidebar, setShowSidebar] = useState(false); /* Hook para mostrar o esconder el sideBar */
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page

  const partidas = [
    { estado : 'Victoria', fecha : '14/4/2024', puntos : '123' },
    { estado : 'Derrota', fecha : '14/4/2024', puntos : '-15' },
    { estado : 'Victoria', fecha : '15/4/2024', puntos : '123' },
    { estado : 'Derrota', fecha : '15/4/2024', puntos : '-15' },
    { estado : 'Victoria', fecha : '16/4/2024', puntos : '123' },
    { estado : 'Derrota', fecha : '16/4/2024', puntos : '-15' },
    { estado : 'Victoria', fecha : '17/4/2024', puntos : '123' },
    { estado : 'Derrota', fecha : '17/4/2024', puntos : '-15' },
    { estado : 'Victoria', fecha : '18/4/2024', puntos : '123' },
    { estado : 'Victoria', fecha : '18/4/2024', puntos : '123' },
    { estado : 'Victoria', fecha : '18/4/2024', puntos : '123' },
    { estado : 'Victoria', fecha : '18/4/2024', puntos : '123' },
    { estado : 'Victoria', fecha : '18/4/2024', puntos : '123' },
    { estado : 'Victoria', fecha : '18/4/2024', puntos : '123' },
    { estado : 'Victoria', fecha : '18/4/2024', puntos : '123' },
    { estado : 'Victoria', fecha : '18/4/2024', puntos : '123' },
    { estado : 'Victoria', fecha : '18/4/2024', puntos : '123' },
    { estado : 'Victoria', fecha : '18/4/2024', puntos : '123' },
    { estado : 'Derrota', fecha : '17/4/2024', puntos : '-15' },
    { estado : 'Derrota', fecha : '17/4/2024', puntos : '-15' },
    { estado : 'Derrota', fecha : '17/4/2024', puntos : '-15' },
    { estado : 'Derrota', fecha : '17/4/2024', puntos : '-15' },
    { estado : 'Derrota', fecha : '17/4/2024', puntos : '-15' },
    { estado : 'Derrota', fecha : '17/4/2024', puntos : '-15' },
    { estado : 'Derrota', fecha : '17/4/2024', puntos : '-15' },
    { estado : 'Derrota', fecha : '17/4/2024', puntos : '-15' },
    { estado : 'Derrota', fecha : '17/4/2024', puntos : '-15' },

  ];

  const chunkSize = 9; // Number of elements per chunk

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

  const partidaChunks = chunkArray(partidas, chunkSize);

  const handleChangePage = (event, newPage) => {
    console.log("pagina ",newPage);
    setCurrentPage(newPage);
  };

  return(
    <div className="background-historial">
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
        <h1 className="pageTitleHistorial">HISTORIAL DE PARTIDAS</h1>
      </div>
      <div className="historial-container">
        <div className="historial-container center">
          <div className="menuDeslizante">
            {/* Render the current chunk based on the current page */}
            <div className="menuDeslizanteContenido">
              {partidaChunks[currentPage - 1]?.map((partida, i) => (
                <div key={i} className={`historialPartidas ${partida.estado}`}>
                  <p className="historialPartidas Estado">{partida.estado}</p>
                  <p className="historialPartidas Fecha">{partida.fecha}</p>
                  <p className="historialPartidas Puntos">Puntos otorgados: {partida.puntos}</p>
                </div>
              ))}
            </div>
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

export default Historial;