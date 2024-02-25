import React, { useState } from "react";
import '../styles/Game.css'
import SideBar from "../components/SideBar";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Game () {
  const [IsMenuVisible, SetIsMenuVisible] = useState(false);
  const playingGame = true;

  const ToggleMenuVisibility = () => {
    SetIsMenuVisible(!IsMenuVisible);
  };

  const InfoPlayers = ({ nombreJugador, eloJugador, colorFicha, tiempoRestante, fichasComidas}) => {
    return (
      <div>
        <div className="game-info">
          <div className="game-info-players">
            <div className="game-info-players-name"> {/* Nombre del jugador y su elo */}
              {nombreJugador} ({eloJugador})
            </div>
            <div className="game-info-players-token"> {/* Color de la ficha del jugador */}
              {colorFicha}
            </div>
          </div>
          <div className="game-info-time"> {/* Tiempo restante del jugador */}
            {tiempoRestante}
          </div>
          <div className="game-info-tokenEaten"> {/* Cantidad de fichas comidas por el jugador */}
            Fichas comidas: 
            {fichasComidas}
          </div> 
        </div>
      </div>
    );
  };

  const InfoGameMode = ({ GameMode }) => {
    return (
      <div className="game-mode-info">
        {GameMode} {/* Modo de juego */}
      </div>
    );
  }

  return (
    <div className="game-background">
      <div className="game-menu">
        {!IsMenuVisible && <button className="game-button-menu" onClick={ToggleMenuVisibility}>
          <MenuIcon sx={{
            color:'#fff', 
            backgroundColor: '#312D2D',
            height: 52, 
            width: 52,
          }}/>
        </button>}
        {IsMenuVisible && <button className="game-button-close-menu" onClick={ToggleMenuVisibility}>
          <CloseIcon sx={{
            color:'#fff', 
            backgroundColor: 'transparent',
            height: 52, 
            width: 52,
          }}/>
        </button>}
        <div className="game-menu-sidebar"> 
          <div className={`sliding-div ${IsMenuVisible ? 'visible' : ''}`}>
            <SideBar ingame={playingGame}/>
          </div>
        </div>
      </div>
      <div className="game-screen">
        <div>
          <InfoGameMode  GameMode="Rapid" /> {/* Cambiar en funcion del modo de juego  */}
        </div>
        <div className="game">
          <div>
            {/* Jugador 1 */}
            <InfoPlayers 
            nombreJugador='Jugador 1' 
            eloJugador='200' 
            colorFicha='Negras' 
            tiempoRestante='10 mins' 
            fichasComidas='0' />
          </div>
          {/* Tablero */}
          <div className="tablero"> {/*Introducir cuando este el tablero hecho */} 
            Tablero
          </div>
          <div>
            {/* Jugador 2 */}
            <InfoPlayers 
              nombreJugador='Jugador 2'
              eloJugador='200'  
              colorFicha='Blancas'
              tiempoRestante='10 mins' 
              fichasComidas='0' />
          </div>
        </div>
      </div>
      <div className="game-chat-box">
        <div className="game-chat">
          CHAT
        </div>
        <div className="game-options">
          AJUSTES DE LA PARTIDA O ALGO
        </div>
      </div>
    </div>
  );
}

export default Game;