import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Game.css'
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import Tablero from '../components/Tablero';


function Game({ gameMode, userInfo }) {
  const [showSidebar, setShowSidebar] = useState(false); /* Mostrar o esconder el sideBar */
  const navigate = useNavigate();
  const [userArenas, setUserArenas] = useState({
    elo: 1200,
    arena: 'Madera', // Actualizar segun el usuario
  });
  const playingGame = true; /* Indica al sideBar de que este componente se está usando en partida */
  const [wantToQuit, setWantToQuit] = useState(false); /* Indica que un jugador quiere abandonar la partida */
  const [confirmSurrender, setConfirmSurrender] = useState(false); /* Contiene los diferentes estados de la partida */

  /* Establecer el tiempo de partida dependiendo del modo de juego  */
  const tiempo = gameMode === 'Rapid' ? 10 : (gameMode === 'Blitz' ? 5 : 3);
  
  /* Gestión de los contadores de partida para cada uno de los jugadores */
  const [minutes1, setMinutes1] = useState(tiempo);
  const [seconds1, setSeconds1] = useState(0);
  const [minutes2, setMinutes2] = useState(tiempo);
  const [seconds2, setSeconds2] = useState(0);
  const [isRunning1, setIsRunning1] = useState(false);
  const [isRunning2, setIsRunning2] = useState(true);
  useEffect(() => {
  if (minutes1 === 0 && seconds1 === 0) {
    // El jugador 1 se ha quedado sin tiempo
    setGameState(prevState => ({
      ...prevState,
      victory: true,
      defeat: true,
      victoryCause: '',
      ganador: 2 // Indica que el jugador 2 ha ganado
    }));
  }
}, [minutes1, seconds1]);

useEffect(() => {
  if (minutes2 === 0 && seconds2 === 0) {
    // El jugador 2 se ha quedado sin tiempo
    setGameState(prevState => ({
      ...prevState,
      victory: true,
      defeat: true,
      victoryCause: '',
      ganador: 1 // Indica que el jugador 1 ha ganado
    }));
  }
}, [minutes2, seconds2]);

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
      <div className="gameInfo">
        <div className="gameInfo players">
          <div className="gameInfo players name"> {/* Nombre del jugador y su elo */}
            {nombreJugador} ({eloJugador})
          </div>
          <div className="gameInfo players color"> {/* Color de la ficha del jugador */}
            {colorFicha}
          </div>
        </div>
        <div className="gameInfo timer"> {/* Tiempo restante del jugador */}
          {minutes} : {seconds}
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
        {GameMode} {/* Modo de juego */}
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
            tiempoRestante='10 mins'
            fichasComidas='0' />
          {/* Tablero */}
          <div className='tableroGame'>
            <GamePopup />
            <Tablero pauseTimer1={pauseTimer1} pauseTimer2={pauseTimer2} arena={userArenas.arena} setVictory={setGameState} userInfo={userInfo}/>
          </div>
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
  );
}

export default Game;