import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Game.css'
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import Tablero from '../components/Tablero';


function Game({ gameMode }) {

  const navigate = useNavigate();

  const playingGame = true; /* Indica al sideBar de que este componente se está usando en partida */
  const [wantToQuit, setWantToQuit] = useState(false); /* Indica que un jugador quiere abandonar la partida */
  const [gameState, setGameState] = useState({ /* Contiene los diferentes estados de la partida */
    confirmSurrender: false,
    isMenuVisible : false,
  });

  /* Confirmar que un usuario quiere rendirse y abandonar la partida */
  const handleConfirmSurrender = () => {
    setGameState(prevState => ({
      ...prevState,
      confirmSurrender : true
    }));
  }
  /* Mostrar o esconder el sideBar */
  const ToggleMenuVisibility = (value) => {
    setGameState(prevState => ({
      ...prevState,
      isMenuVisible : value,
    }));
  };

  /* Establecer el tiempo de partida dependiendo del modo de juego  */
  const tiempo = gameMode === 'Rapid' ? 10 : (gameMode === 'Blitz' ? 5 : 3);
  
  /* Gestión de los contadores de partida para cada uno de los jugadores */
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
        } else if(minutes2 > 0){
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

  /* Cuadros informativos para cada uno de los jugadores */
  const InfoPlayers = ({numJugador, nombreJugador, eloJugador, colorFicha, tiempoRestante, fichasComidas }) => {
    const minutes = parseInt(numJugador,10) ===1?minutes1:minutes2;
    const seconds = parseInt(numJugador,10) ===1?seconds1:seconds2;
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
          <div className="game-info-players-timer"> {/* Tiempo restante del jugador */}
            {minutes} : {seconds}
          </div>
          <div className="game-info-tokenEaten"> {/* Cantidad de fichas comidas por el jugador */}
            Fichas comidas: {fichasComidas}
          </div>
        </div>
      </div>
    );
  };

  /* Cuadro informativo del modo de juego al que se está jugando */
  const InfoGameMode = ({ GameMode }) => {
    return (
      <div className="game-mode-info">
        {GameMode} {/* Modo de juego */}
      </div>
    );
  }

  /* Mensajes informativos (en forma de PopUp) que surgen en función del estado de la partida */
  const GamePopup = () => {
    return(
      <>
        {/* El jugador quiere abandonar la partida (mediante el botón del sideBar) */}
        {wantToQuit && playingGame &&
        <div className="popup-background">
          <div className="game-popup">
            <h1><u>¿Seguro que quieres abandonar la partida? </u></h1>
            <div className="game-popup-button-surrender">
                <button className="game-popup-button" onClick={() => {handleConfirmSurrender();  navigate('/home')}}>
                  Sí
                </button>
                <button className="game-popup-button" onClick={() => setWantToQuit(false)}>
                  No
                </button>
            </div>
          </div>
        </div>}
      </>
    );
  }

  /* Juego Local */
  return (
    <div className="game-background">
      <div className="game-menu">
        {/* Botón para desplegar el sidebar */}
        <button className={!gameState.isMenuVisible ? "game-button-menu" : "game-button-menu hidden"} onClick={() => ToggleMenuVisibility(true)}>
          <MenuIcon sx={{
            color: '#fff',
            backgroundColor: '#312D2D',
            height: 52,
            width: 52,
          }} />
        </button>
        {/* Sidebar */}
        <div className={`sliding-div ${gameState.isMenuVisible ? 'visible' : ''}`}>
          <SideBar ingame={playingGame} setWantToQuit={setWantToQuit} setShowSidebar={ToggleMenuVisibility}/>
        </div>
      </div>
      <div style={{width: '75%'}} className="game-screen">
        {/* Mensajes en forma de PopUp */}
        <GamePopup />
        <div className="game-mode"> 
          {/* Indicador del modo de juego al que se esta jugando */}
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