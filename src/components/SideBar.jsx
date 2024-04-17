import React, { useEffect,useState, useContext, useCallback} from 'react';
import { UNSAFE_useScrollRestoration, useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png'
import '../styles/Sidebar.css';
import CloseIcon from '@mui/icons-material/Close';
import {SocketContext} from './../context/socket';
import { Tooltip } from "@mui/material";

function SideBar(args) {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Hook para simular la pantalla de carga
  const [gamesPopUp, setGamesPopUp] = useState(false); // Hook para mostrar los modos de juego
  const [matchFound, setMatchFound] = useState(false); // Hook para indicador de que se ha encontrado partida

  useEffect(() => {
    if (socket) {
      // Escuchar el evento 'game_ready' del servidor
      socket.on('game_ready', (data) => {
        setMatchFound(false);
        const colorSuffix = data.color === 'white' ? '0' : '1';
        args.updatePlayersInGame({me: data.me, opponent: data.opponent}); // Guarda la información de los jugadores de la partida
        // Cifrar los parámetros y agregarlos a la URL
        navigate(`/gameOnline/${data.roomId}/${colorSuffix}`);
      });
    }
    return () => {
      socket.off("game_ready");
    };
  }, [socket/*, navigate*/]); // Descomentar el navigate si hace falta, pero creo que con la llamada anterior sobra

  useEffect(() => { // Gestión de eventos a la hora de buscar/comenzar una partida
    if (socket){
      socket.on('match_found', () => {
        setLoading(false);
        setMatchFound(true);
      });
      socket.on('match_canceled', () => {
        setLoading(false);
        setMatchFound(false); 
      });
    }
    return () => {
      socket.off("match_canceled");
      socket.off("match_found");
    };
  },[socket]);

  const h1Style = {
    color: 'white',
  };
  const handleClick = () => {
    setGamesPopUp(!gamesPopUp);
  };
  /*const handleClickJugar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      /*navigate('/game'); 
    }, 5000); // 5000 milisegundos = 5 segundos
  }*/

  const handleClickJugarRA = () => {
    args.updateMode('Rapid');
    navigate('/game'); 
  }
  const handleClickJugarBU = () => {
    args.updateMode('Bullet');
    navigate('/game');
  }
  const handleClickJugarBL = () => {
    args.updateMode('Blitz');
    navigate('/game');
  }

  const LocalMode = () => {
    return (
      /* Modos de juego para partidas en local */
      <div className='popUp-content-info'>
        <div className='popUp-content-info-title'>
          JUGAR EN MODO LOCAL
        </div>
        <div className='popUp-content-info-modes'>
          <button className='popUp-modes' onClick={handleClickJugarRA}>RAPID</button>
          <div>
            |
          </div>
          <button className='popUp-modes' onClick={handleClickJugarBU}>BULLET</button>
          <div>
            |
          </div>
          <button className='popUp-modes' onClick={handleClickJugarBL}>BLITZ</button>
        </div>
      </div>
    );
  }
const handleClickJugarRAOnline = () => {
    args.updateMode('Rapid');
    console.log(args.gameMode);
    setLoading(true);
    socket.emit('join_room', { mode: 'Rapid' }); // Envía un evento al servidor para unirse al juego en modo Rapid
  };
  const handleClickJugarBUOnline = () => {
    args.updateMode('Bullet');
    setLoading(true);
    socket.emit('join_room', { mode: 'Bullet' }); // Envía un evento al servidor para unirse al juego en modo Bullet
  }
  const handleClickJugarBLOnline = () => {
    args.updateMode('Blitz');
    setLoading(true);
    socket.emit('join_room', { mode: 'Blitz' }); // Envía un evento al servidor para unirse al juego en modo Blitz
  }
  const OnlineMode = () => {
    return (
      /* Modos de juego para partidas online */
      <div className='popUp-content-info'>
        <div className='popUp-content-info-title'>
          JUGAR EN MODO ONLINE
        </div>
        <div className='popUp-content-info-modes'>
          <button className='popUp-modes' onClick={handleClickJugarRAOnline}>RAPID</button> 
          <div>
            |
          </div>
          <button className='popUp-modes' onClick={handleClickJugarBUOnline}>BULLET</button>
          <div>
            |
          </div>
          <button className='popUp-modes' onClick={handleClickJugarBLOnline}>BLITZ</button>
        </div>
      </div>
    );
  }

  const PopUpMenu = () => {
    return (
      /* Menú PopUp para escoger el modo de juego */
      <div className='popUp'>
        <div className='popUp-content'>
          <div className='close-button'>
            {/* Botón para cerrar el menú de selección de modo */}
            <button className='close-button' onClick={handleClick}>
              {/* Hint para el botón de cerrar el menú */}
              <Tooltip
                title="Cerrar"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -25],
                        },
                      },
                    ],
                  },
                }}
              >
                <CloseIcon sx={{
                  color:'#fff', 
                  height: 42, 
                  width: 42,
                }}/>
              </Tooltip>
            </button>
          </div>
          {/* Modos de juego */}
          <LocalMode />
          <OnlineMode />
        </div>
      </div>
    );
  }

  /* Cancelar la búsqueda de partida */
  const handleCancelarBusqueda = () => {
    setLoading(false);
    socket.emit('cancel_search', { mode: args.gameMode }); // Avisar al servidor de la cancelación de búsqueda
  }

  /* Cancelar partida (ya se ha encontrado oponente) */
  const handleCancelarMatch = () => {
    setMatchFound(false); 
    socket.emit('cancel_match'); // Avisar al contrincante de la cancelación
  }

  /* Pantalla de carga */
  const LoadingScreen = () => {
    return (
      <div className="overlay">
        <div className="spinner"></div>
        <h1 style={h1Style}>Buscando partida</h1>
        <button className='cancelButton' onClick={handleCancelarBusqueda}>Cancelar búsqueda</button>
      </div>
    );
  }

  /* Partida encontrada */
  const MatchFound = () => {
    const [countdown, setCountdown] = useState(5);
    /* Cuenta atrás antes de que empiece la partida */
    useEffect(() => {
      const interval = setInterval(() => {
        if(countdown > 0){
          setCountdown((prevCountdown) => prevCountdown - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    /* Mensaje de partida encontrada + contador */
    return(
      <div className="overlay">
        <h1 style={h1Style}>PARTIDA ENCONTRADA</h1>
        <h1 style={h1Style}>La partida empieza en : </h1>
        <h1 style={h1Style}>{countdown}</h1>
        <button className='cancelButton' onClick={handleCancelarMatch}>Cancelar búsqueda</button>
      </div> 
    );
  }

  return (
    /* Devulve un sidebar con diferentes opciones */
    <div className='Sidebar'>
      {/* Botón para esconder el sideBar en aquellas pantallas donde no está fijo (solo desplegado) */}
      {!args.inhome && <button className='hideSidebarButton' onClick={() => args.setShowSidebar(false)}>
        <CloseIcon sx={{
          color: '#fff',
          backgroundColor: 'transparent',
          height: 52,
          width: 52,
        }} />
      </button>}
      {/* Logo de la organización */}
      <div><img className='logo' src={logo}/></div>
      <div className='listaSidebar'>
        <div className='botonJugarWrapper'> 
          {/* El boton de jugar solo aparece cuando se está en la pantalla "home" */}
          {args.inhome && <button className='botonJugar' onClick={handleClick} /*disabled={loading}*/>
            Jugar
          </button>}
          {loading && <LoadingScreen />} {/* Pantalla de carga */}
          {matchFound && <MatchFound />} {/* Pantalla de partida encontrada */}
          {gamesPopUp && <PopUpMenu />} {/* PopUp para escoger el modo de juego */}
        </div>
        {/* Opciones del sidebar*/}
        {!args.inhome && args.ingame && <div><a style={{cursor: 'pointer'}} onClick={() => args.setWantToQuit(true)}>Menú principal</a></div>}
        {!args.inhome && !args.ingame && <div><a href="/home">Menú principal</a></div>}
        <div><a href="/battlePass">Pase de Batalla</a></div>
        <div><a href="/ranking">Ranking</a></div>
        <div><a href="/arenas">Arenas</a></div>
        <div><a href="/personalizacion">Personalización</a></div>
      </div>
    </div>
  );
}

export default SideBar;
