import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Game.css'
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Tablero from '../components/Tablero';


function Game({ gameMode }) {
  const navigate = useNavigate();
  const [IsMenuVisible, SetIsMenuVisible] = useState(false);
  const [surrender, setSurrender] = useState(false); // Hook para comprobar si el jugador se ha rendido
  const [confirmSurrender, setConfirmSurrender] = useState(false); // Hook para confirmar que se ha rendido
  const [showingSettings, setShowingSettings] = useState(false); // Hook para mostrar el menú de ajustes
  const [isPlaying, setIsPlaying] = useState(true); // Hook para pausar la partida
  const playingGame = true; // Const para indicar que el Sidebar se esta usando en la pantalla de game
  const handleSurrender = () => {
    setSurrender(!surrender);
  }
  const handleConfirmSurrender = () => {
    setConfirmSurrender(true);
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

  const TextInputWithButton = () => {
    const [text, setText] = useState('');
    const [submittedText, setSubmittedText] = useState('');

    const handleChange = (event) => {
      setText(event.target.value);
    };

    const handleSubmit = () => {
      setSubmittedText(text);
      setText('');
    };

    return (
      <div>
        <label htmlFor="textInput">Enter Text: </label>
        <input
          type="text"
          id="textInput"
          value={text}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        {submittedText && <p>You submitted: {submittedText}</p>}
      </div>
    );
  };
  const tiempo = gameMode === 'Rapid' ? 10 : (gameMode === 'Blitz' ? 5 : 3);
  
  const [minutes1, setMinutes1] = useState(tiempo);
  const [seconds1, setSeconds1] = useState(0);
  const [minutes2, setMinutes2] = useState(tiempo);
  const [seconds2, setSeconds2] = useState(0);
  const [isRunning1, setIsRunning1] = useState(false);
  const [isRunning2, setIsRunning2] = useState(true);
  useEffect(()=>{
    let interval;
    if(isRunning1){
      interval =setInterval(()=>{
        if(seconds1 > 0){
          setSeconds1((seconds1)=>seconds1-1)
        }else if(minutes1 > 0){
          setMinutes1((minutes1)=>minutes1-1);
          setSeconds1(59);
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [seconds1, minutes1, isRunning1])
  useEffect(()=>{
    let interval;
    if(isRunning2){
      interval =setInterval(()=>{
        if(seconds2 > 0){
          setSeconds2((seconds2)=>seconds2-1)
        }else if(minutes2 > 0){
          setMinutes2((minutes2)=>minutes2-1);
          setSeconds2(59);
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [seconds2, minutes2, isRunning2])
  const pauseTimer1 = () => {
    setIsRunning1(false);
    setIsRunning2(true)
  }
  const pauseTimer2 = () => {
      setIsRunning2(false);
      setIsRunning1(true);
  }
  const InfoPlayers = ({numJugador, nombreJugador, eloJugador, colorFicha, tiempoRestante, fichasComidas }) => {
    const minutes = parseInt(numJugador,10) ===1?minutes1:minutes2;
    const seconds = parseInt(numJugador,10) ===1?seconds1:seconds2;
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
          <div className="game-info-players-timer">
            {minutes} : {seconds}
          </div>
          <div className="game-info-tokenEaten"> {/* Cantidad de fichas comidas por el jugador */}
            Fichas comidas: {fichasComidas}
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
            color: '#fff',
            backgroundColor: '#312D2D',
            height: 52,
            width: 52,
          }} />
        </button>}
        {/* Div que contiene el sidebar */}
        <div className="game-menu-sidebar">
          <div className={`sliding-div ${IsMenuVisible ? 'visible' : ''}`}>
            {IsMenuVisible && <button className="game-button-close-menu" onClick={ToggleMenuVisibility}>
              <CloseIcon sx={{
                color: '#fff',
                backgroundColor: 'transparent',
                height: 48,
                width: 48,
              }} />
            </button>}
            <SideBar ingame={playingGame} />
          </div>
        </div>
      </div>
      <div className="game-screen">
        {/* Diferentes popUps con mensajes */}
        {showingSettings && !surrender &&
          <div className="popup-background">
            <div className="game-popup-settings">
              <h1><u>Menú de ajustes de la partida</u></h1>
            </div>
          </div>}
        {!isPlaying && !surrender &&
          <div className="popup-background">
            <div className="game-popup-pause">
              <h1><u>Se ha pausado la partida</u></h1>
              <button className="game-popup-button" onClick={handlePause}>
                Reanudar Partida
                <PlayArrowIcon sx={{
                  color: 'white',
                  width: 32,
                  height: 32
                }} />
              </button>
            </div>
          </div>}
        {surrender &&
          <div className="popup-background">
            {surrender && !confirmSurrender &&
              <div className="game-popup-surrender">
                <h1><u>¿Estas seguro de que deseas rendirte?</u></h1>
                <div className="game-popup-button-surrender">
                  <button className="game-popup-button" onClick={handleConfirmSurrender}>
                    Sí
                  </button>
                  <button className="game-popup-button" onClick={handleSurrender}>
                    No
                  </button>
                </div>
              </div>}
            {confirmSurrender &&
              <div className="game-popup-surrender">
                <h1><u>¡Te has rendido!</u></h1>
                <h3>El jugador X gana</h3>
                <button className="game-popup-button" onClick={() => navigate('/home')}>
                  Abandonar partida
                </button>
              </div>}
          </div>}
        <div className="game-mode"> {/* Indicador del modo de juego al que se esta jugando */}
          <InfoGameMode GameMode={gameMode} />
        </div>
        <div className="game">
          <div>
            {/* Jugador 1 */}
            <InfoPlayers
              numJugador='1'
              nombreJugador='Jugador 1'
              eloJugador='200'
              colorFicha='Negras'
              tiempoRestante='10 mins'
              fichasComidas='0' />
          </div>
          {/* Tablero */}
          <div className="tablero-wr">
            <Tablero pauseTimer1={pauseTimer1} pauseTimer2={pauseTimer2} />
          </div>
          <div>
            {/* Jugador 2 */}
            <InfoPlayers
            numJugador='2'
              nombreJugador='Jugador 2'
              eloJugador='200'
              colorFicha='Blancas'
              tiempoRestante='10 mins'
              fichasComidas='0' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;