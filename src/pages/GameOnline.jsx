import React, { useEffect, useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GameOnline.css'
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import FlagIcon from '@mui/icons-material/Flag';
import Tooltip from '@mui/material/Tooltip';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TableroOnline from '../components/TableroOnline';
import { useParams } from 'react-router-dom';
import Chat from '../components/Chat.jsx';
import {SocketContext} from './../context/socket';

function GameOnline({ gameMode, userInfo }) {
  const [showSidebar, setShowSidebar] = useState(false); /* Mostrar o esconder el sideBar */
  const socket = useContext(SocketContext);
  const [userArenas, setUserArenas] = useState({
    elo: 1200,
    arena: 'MADERA', // Actualizar segun el usuario
  });
  const navigate = useNavigate();
  const [wantToQuit, setWantToQuit] = useState(false); /* Indica que un jugador quiere abandonar la partida */
  const [gameState, setGameState] = useState({ /* Contiene los diferentes estados de la partida */
    victory : false,
    defeat : false,
    victoryCause : '',
    surrender : false,
    confirmSurrender: false,
    showingSettings: false,
    isPlaying : true,
  });
  var playingGame = true; /* Indica al sideBar de que este componente se está usando en partida */
  const { roomId, colorSuffix } = useParams();

  useEffect(() => {
    /* El servidor inforda de que el oponente se ha desconectado de la partida */
    socket.on("player_disconnected", () => { 
      setGameState(prevState => ({
        ...prevState,
        victory : true, 
        victoryCause : 'disconnect',
      }));
      playingGame = false; 
    });

    return () => {
      socket.off("player_disconnected");
    };
  },[]);

  useEffect(() => {
    /* El oponente ha movido pieza */
    socket.on("movido", (data)=>{
      setTableroUpdate(data);
    })
  }, [socket]);

  const [tableroEnviar, setTableroEnviar] = useState(null)
  const [tableroUpdate, setTableroUpdate] = useState(null)

  useEffect(() => {
    /* Movimiento de pieza,  se envía dicho movimiento al servidor */
    if (socket && tableroEnviar) {
      console.log(tableroEnviar)
      socket.emit("move", { tableroEnviar, roomId});
      console.log("muevo");
    }
  }, [socket, tableroEnviar]);

  useEffect(() => { 
    /* El servidor informa de que el oponente se ha rendido */
    if (socket){
      socket.on("oponent_surrendered", () =>{
        setGameState(prevState => ({
          ...prevState,
          victory : true, 
          victoryCause : 'surrender',
        }));
      });
      playingGame = false;
    }
    return() => {
      socket.off("oponent_surrendered");
    }
  });

  /* El usuario quiere rendirse */
  const handleSurrender = () => {
    setGameState(prevState => ({
      ...prevState,
      surrender : !gameState.surrender
    }));
  }
  /* Confirmar que el usuario quiere rendirse y abandonar la partida */
  const handleConfirmSurrender = () => {
    setGameState(prevState => ({
      ...prevState,
      confirmSurrender : true
    }));
    /* Aviso al servidor de que el usuario se ha rendido */
    socket.emit("I_surrender", {roomId}); 
  }
  /* Pausar o reanudar la partida */
  const handlePause = () => {
    setGameState(prevState => ({
      ...prevState,
      isPlaying : !gameState.isPlaying
    }));
    //setIsPlaying(!isPlaying);
    // Parar los timers
  }

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
        }else if(minutes2 > 0){
          setMinutes2((minutes2)=>minutes2-1);
          setSeconds2(59);
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [seconds2, minutes2, isRunning2])
  const pauseTimer1 = ()=>{
      setIsRunning1(false);
      setIsRunning2(true)
  }
  const pauseTimer2 = ()=>{
      setIsRunning2(false);
      setIsRunning1(true);
  }

  /* Cuadros informativos para cada uno de los jugadores */
  const InfoPlayers = ({numJugador, nombreJugador, eloJugador}) => {
    const minutes = parseInt(numJugador,10) ===1?minutes1:minutes2;
    const seconds = parseInt(numJugador,10) ===1?seconds1:seconds2;
    return (
      /* Devuelve un cuadro informativo para cada uno de los jugadores */
      <div>
        <div className="gameOnlineInfo">
          <div className="gameOnlineInfo players">
            <div className="gameOnlineInfo players name"> {/* Nombre del jugador y su elo */}
              Usuario : {nombreJugador} 
            </div>
          </div>
          <div className="gameOnlineInfo timer"> {/* Tiempo restante del jugador */}
            {minutes} : {seconds}
          </div>
          <div className="gameOnlineInfo elo"> {/* Cantidad de fichas comidas por el jugador */}
            Elo: {eloJugador}
          </div>
        </div>
      </div>
    );
  };

  /* Cuadro informativo del modo de juego al que se está jugando */
  const InfoGameMode = ({ GameMode }) => {
    return (
      <div className="pageTitleGameOnline">
        {GameMode} {/* Modo de juego */}
      </div>
    );
  }

  /* Mensajes informativos (en forma de PopUp) que surgen en función del estado de la partida */
  const GamePopup = () => {
    return(
      <>
        {/* Partida pausada */}
        {!gameState.isPlaying && !gameState.surrender &&
          <div className="gameOnlinePopupBackground">
            <div className="gameOnlinePopup">
              <h1><u>Se ha pausado la partida</u></h1>
              <button className="gameOnlinePopupButt" onClick={handlePause}>
                Reanudar Partida
                <PlayArrowIcon sx={{
                  color: 'white',
                  width: 32,
                  height: 32
                }} />
              </button>
            </div>
          </div>}

        {/* Surrender de jugador */}
        {gameState.surrender && 
          <div className="gameOnlinePopupBackground">
            {gameState.surrender && !gameState.confirmSurrender &&
              <div className="gameOnlinePopup">
                <h1><u>¿Estas seguro de que deseas rendirte?</u></h1>
                <div className="gameOnlinePopupButtons">
                  <button className="gameOnlinePopupButt confirm" onClick={handleConfirmSurrender}>
                    Sí
                  </button>
                  <button className="gameOnlinePopupButt cancel" onClick={handleSurrender}>
                    No
                  </button>
                </div>
              </div>}
            {gameState.confirmSurrender &&
              <div className="gameOnlinePopup">
                <h1><u>¡Te has rendido!</u></h1>
                <h3>El jugador {userInfo.opponent} gana</h3>
                <button className="gameOnlinePopupButt" onClick={() => navigate('/home')}>
                  Abandonar partida
                </button>
              </div>}
          </div>}

        {/* Mensajes de victoria */}
        {gameState.victory && 
          <div className='gameOnlinePopupBackground'>
            <div className='gameOnlinePopup'>
              <div>
                <h1>¡Has ganado!</h1>
                {/* Causa de la victoria */}
                {gameState.victoryCause === 'disconnect' ? (<h2>Ganas por desconexión del rival</h2>) 
                : gameState.victoryCause === 'surrender' ?  (<h2>Ganas por rendición del rival</h2>)
                : gameState.victoryCause === 'jaque' ? (<h2>Ganas por jaque mate</h2>)
                : (<h2>Ganas por falta de tiempo del rival</h2>)}
              </div>
              <div>
                <p>+5 puntos de Elo</p>
                <p>+10 puntos de recompensa</p>
              </div>
              <button className="gameOnlinePopupButt" onClick={() => navigate('/home')}>
                Abandonar partida
              </button>
            </div>
          </div>}

        {/* Mensajes de derrota */}
        {gameState.defeat && 
          <div className='gameOnlinePopupBackground'>
            <div className='gameOnlinePopup'>
              <div>
                <h1>¡Has perdido!</h1>
                {/* Causa de la victoria */}
                {gameState.victoryCause === 'jaque' ? (<h2>Pierdes por jaque mate</h2>)
                : (<h2>Pierdes por falta de tiempo</h2>)}
              </div>
              <div>
                <p>-5 puntos de Elo</p>
                <p>+5 puntos de recompensa</p>
              </div>
              <button className="gameOnlinePopupButt" onClick={() => navigate('/home')}>
                Abandonar partida
              </button>
            </div>
          </div>}

        {/* El jugador quiere abandonar la partida (mediante el botón del sideBar) */}
        {wantToQuit && playingGame &&
        <div className="gameOnlinePopupBackground">
          <div className="gameOnlinePopup">
            <div>
              <h1><u>¿Seguro que quieres abandonar la partida? </u></h1>
              <h2>Perderás la partida al desconectarte</h2>
            </div>
            <div className="gameOnlinePopupButtons">
                <button className="gameOnlinePopupButt confirm" onClick={() => {handleConfirmSurrender();  navigate('/home')}}>
                  Sí
                </button>
                <button className="gameOnlinePopupButt cancel" onClick={() => setWantToQuit(false)}>
                  No
                </button>
            </div>
          </div>
        </div>}
      </>
    );
  }

  /* Juego Online */
  return (
    <div className="gameOnlineBackground">
      <div className={showSidebar ? "sideGameOnline open" : "sideGameOnline"}>
        {/* sideBar */}
        <SideBar ingame={playingGame} setWantToQuit={setWantToQuit} setShowSidebar={setShowSidebar}/>
      </div>
      <div className="titleGameOnline">
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
      <div className="gameOnlineScreen">
        <div className="gameOnline">
          {/* Jugador 1 */}
          <InfoPlayers
            numJugador='1'
            nombreJugador={userInfo.opponentName}
            eloJugador={userInfo.opponentElo}/>
          {/* Tablero */}
          <div className='tableroGameOnline'>
            <GamePopup /> {/* Mensajes en forma de PopUp */}
            <TableroOnline blancasAbajo={colorSuffix.toString()==='0'} tableroUpdate={tableroUpdate} setTableroEnviar={setTableroEnviar} pauseTimer1={pauseTimer1} pauseTimer2={pauseTimer2} arena={userArenas.arena} userInfo={userInfo}/>
          </div>
          {/* Jugador 2 */}
          <InfoPlayers
            numJugador='2'
            nombreJugador={userInfo.userName}
            eloJugador={userInfo.eloRapid} />
        </div>
        <div className='gameOnlineChatContainer'>
          {/* Chat de la partida */}
          <div className="gameOnlineChat">
            <Chat socket={socket} roomId={roomId} userInfo={userInfo}/>
          </div>
          {/* Botones de opciones para la partida */}
          <div className="gameOnlineOptions">
            {/* Botón de rendición */}
            <button className="gameOnlineOptionsButton" onClick={handleSurrender} disabled={gameState.confirmSurrender}>
              <Tooltip title="Rendirse">
                <FlagIcon sx={{
                  color: 'white',
                  height: 42,
                  width: 42
                }} />
              </Tooltip>
            </button>
            {/* Botón para parar o reanudar la partida */}
            <button className="gameOnlineOptionsButton" onClick={handlePause} disabled={gameState.surrender || gameState.confirmSurrender}>
              {gameState.isPlaying ? 
                (<Tooltip title="Pausar partida">
                  <PauseIcon sx={{
                    color: 'white',
                    width: 42,
                    height: 42
                  }} />
                </Tooltip> )  : 
                (<Tooltip title="Reanudar partida">
                  <PlayArrowIcon sx={{
                    color: 'white',
                    width: 42,
                    height: 42
                  }} />
                </Tooltip>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameOnline;