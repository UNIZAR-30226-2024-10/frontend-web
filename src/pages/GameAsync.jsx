import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Game.css'
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import TableroAsync from '../components/TableroAsync';


function GameAsync({ gameMode }) {
  const [showSidebar, setShowSidebar] = useState(false); /* Mostrar o esconder el sideBar */
  const navigate = useNavigate();
  const [userArenas, setUserArenas] = useState({
    elo: 1200,
    arena: 'Madera', // Actualizar segun el usuario
  });
  const playingGame = true; /* Indica al sideBar de que este componente se está usando en partida */
  const [wantToQuit, setWantToQuit] = useState(false); /* Indica que un jugador quiere abandonar la partida */
  const [confirmSurrender, setConfirmSurrender] = useState(false); /* Contiene los diferentes estados de la partida */


  /* Cuadros informativos para cada uno de los jugadores */
  const InfoPlayers = ({numJugador, nombreJugador, eloJugador, colorFicha, fichasComidas }) => {
    return (
      <div className="gameInfo">
        <div className="gameInfo players">
          <div className="gameInfo players name"> {/* Nombre del jugador y su elo */}
            {nombreJugador} ({eloJugador})
          </div>
          <div className="gameInfo players color"> {/* Color de la ficha del jugador */}
            {colorFicha}
          </div>
        </div>
        <div className="gameInfo eaten"> {/* Cantidad de fichas comidas por el jugador */}
          Fichas comidas: {fichasComidas}
        </div>
      </div>
    );
  };

  /* Cuadro informativo del modo de juego al que se está jugando */
  const InfoGameMode = ({ GameMode }) => {
    return (
      <div className="pageTitleGame">
        Correspondencia
      </div>
    );
  }
 const [gameState, setGameState] = useState({ /* Contiene los diferentes estados de la partida */
    victory : false,
    defeat : false,
    victoryCause : '',
    ganador:''
  });
 /* Mensajes informativos (en forma de PopUp) que surgen en función del estado de la partida */
  const GamePopup = () => {
    return(
      <>
        {gameState.victory && 
          <div className='gameOnlinePopupBackground'>
            <div className='gameOnlinePopup'>
              <div>
                <h1>¡Has ganado!</h1>
                {/* Causa de la victoria */}
                {gameState.victoryCause === 'jaque' ? (<h2>Gana el jugador {gameState.ganador===0?2:1} por jaque mate</h2>)
                : (<h2>Gana el jugador {gameState.ganador} por falta de tiempo del rival</h2>)}
              </div>
              <button className="gameOnlinePopupButt" onClick={() => navigate('/home')}>
                Abandonar partida
              </button>
            </div>
          </div>}
      </>
    );
  }

  /* Juego Local */
  return (
    <div className="gameBackground">
      <div className={showSidebar ? "sideGame open" : "sideGame"}>
        {/* sideBar */}
        <SideBar ingame={playingGame} setWantToQuit={setWantToQuit} setShowSidebar={setShowSidebar}/>
      </div> 
      <div className="titleGame">
        {/* Botón para desplegar el sidebar */}
        <button className={!showSidebar ? "sideMenuButton" : "sideMenuButton hidden"} onClick={() => setShowSidebar(true)}>
          <MenuIcon sx={{
            color: '#fff',
            backgroundColor: 'transparent',
            height: 52,
            width: 52,
          }} />
        </button>
        {/* Título de la página */}
        <InfoGameMode GameMode={gameMode} />
      </div>
      <div className='gameScreen'>
        <div className='game'>
          {/* Jugador 1 */}
          <InfoPlayers
            numJugador='1'
            nombreJugador='Jugador 1'
            eloJugador='200'
            colorFicha='Negras'
            fichasComidas='0' />
          {/* Tablero */}
          <div className='tableroGame'>
            <GamePopup />
            <TableroAsync arena={userArenas.arena} setVictory={setGameState}/>
          </div>
          {/* Jugador 2 */}
          <InfoPlayers
          numJugador='2'
            nombreJugador='Jugador 2'
            eloJugador='200'
            colorFicha='Blancas'
            fichasComidas='0' />
        </div>
      </div>
    </div>
  );
}

export default GameAsync;