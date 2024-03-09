import React, { useState } from "react";
import '../styles/Game.css'
import SideBar from "../components/SideBar";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Tablero from "../components/Tablero";

function Game () {
  const [IsMenuVisible, SetIsMenuVisible] = useState(false);
  const [surrender, setSurrender] = useState(false);
  const [showingSettings, setShowingSettings] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const playingGame = true;
  const gameMode = "Rapid";

  const handleSurrender = () => {
    setSurrender(true);
  }
  const handleSettings = () => {
    setShowingSettings(!showingSettings);
  }
  const ToggleMenuVisibility = () => {
    SetIsMenuVisible(!IsMenuVisible);
  };
  const handlePause = () => {
    setIsPlaying(!isPlaying);
  }

  const InfoPlayers = ({ nombreJugador, eloJugador, colorFicha, tiempoRestante, fichasComidas}) => {
    return (
      /* Devuelve un cuadro informativo para cada uno de los jugadores */
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
      /* Devuelve el modo de juego al que se esta jugando */
      <div className="game-mode-info">
        {GameMode} {/* Modo de juego */}
      </div>
    );
  }

  return (
    <div className="game-background">
      <div className="game-menu">
        {/* Botón para desplegar el sidebar */}
        {!IsMenuVisible && <button className="game-button-menu" onClick={ToggleMenuVisibility}>
          <MenuIcon sx={{
            color:'#fff', 
            backgroundColor: '#312D2D',
            height: 52, 
            width: 52,
          }}/>
        </button>}
        {/* Div que contiene el sidebar */}
        <div className="game-menu-sidebar"> 
          <div className={`sliding-div ${IsMenuVisible ? 'visible' : ''}`}>
            {IsMenuVisible && <button className="game-button-close-menu" onClick={ToggleMenuVisibility}>
            <CloseIcon sx={{
              color:'#fff', 
              backgroundColor: 'transparent',
              height: 48, 
              width: 48,
            }}/>
            </button>}
            <SideBar ingame={playingGame}/>
          </div>
        </div>
      </div>
      <div className="game-screen">
        {/* Diferentes popUps con mensajes */}
        {!isPlaying && !surrender && 
          <div className="game-popup">
            <h1>Se ha pausado la partida</h1>
            <button className="game-popup-button" onClick={handlePause}>Reanudar Partida</button>
          </div>}
        {showingSettings && !surrender &&
          <div className="game-popup"> 
            <h1>Menú de ajustes de la partida</h1>
          </div>}
        {surrender &&
          <div className="game-popup">
            <h1>¡Te has rendido!</h1>
            <h3>El jugador 2 gana</h3>
          </div>}
        <div> {/* Indicador del modo de juego al que se esta jugando */}
          <InfoGameMode  GameMode={gameMode} /> 
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
          <div className="tablero-wr"> {/*Introducir cuando este el tablero hecho */} 
            <Tablero />
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
        {/* Chat de la partida */}
        <div className="game-chat">
          CHAT
        </div>
        {/* Botones de opciones para la partida */}
        <div className="game-options">
          {/* Botón de rendición */}
          <button className="game-options-button" onClick={handleSurrender}>
            <Tooltip title="Rendirse">
              <FlagIcon sx={{
                color: 'white',
                height: 42,
                width: 42
              }}/>
            </Tooltip>
          </button>
          {/* Botón para parar o reanudar la partida */}
          <button className="game-options-button" onClick={handlePause}>
            {isPlaying ? 
              (<Tooltip title="Pausar partida">
                <PauseIcon sx={{
                  color: 'white',
                  width: 42,
                  height: 42
                }}/>
              </Tooltip>) : 
              (<Tooltip title="Reanudar partida">
                <PlayArrowIcon sx={{
                  color: 'white',
                  width: 42,
                  height: 42
                }}/>
              </Tooltip>)}
          </button>
          {/* Botón de ajustes de la partida */}
          <button className="game-options-button" onClick={handleSettings}>
            <Tooltip title="Ajustes">
              <SettingsIcon sx={{
                color: 'white',
                height: 42,
                width: 42
              }}/>
            </Tooltip>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game;