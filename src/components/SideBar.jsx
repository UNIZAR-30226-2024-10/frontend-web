import React, { useEffect,useState, useContext, useCallback} from 'react';
import { UNSAFE_useScrollRestoration, useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png'
import '../styles/Sidebar.css';
import CloseIcon from '@mui/icons-material/Close';
import {SocketContext} from './../context/socket';

function SideBar(args) {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Hook para simular la pantalla de carga
  const [gamesPopUp, setGamesPopUp] = useState(false); // Hook para mostrar los modos de juego
  const [matchFound, setMatchFound] = useState(false); 

  useEffect(() => {
    if (socket) {
      // Escuchar el evento 'game_ready' del servidor
      socket.on('game_ready', (data) => {
        setMatchFound(false);
        const colorSuffix = data.color === 'white' ? '0' : '1';
        // Cifrar los parámetros y agregarlos a la URL
        navigate(`/gameOnline/${data.roomId}/${colorSuffix}`);
      });
    }
    return () => {
      socket.off("game_ready");
    };
  }, [socket/*, navigate*/]); // Descomentar el navigate si hace falta, pero creo que con la llamada anterior sobra

  useEffect(() => {
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
      /*navigate('/game'); // Reemplaza '/nueva-pagina' con la URL de la página que quieres cargar
    }, 5000); // 5000 milisegundos = 5 segundos
  }*/

  const handleClickJugarRA = () => {
    args.updateMode('Rapid');
    navigate('/game'); // Reemplaza '/nueva-pagina' con la URL de la página que quieres cargar
  }
  const handleClickJugarBU = () => {
    args.updateMode('Bullet');
    navigate('/game'); // Reemplaza '/nueva-pagina' con la URL de la página que quieres cargar
  }
  const handleClickJugarBL = () => {
    args.updateMode('Blitz');
    navigate('/game'); // Reemplaza '/nueva-pagina' con la URL de la página que quieres cargar
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
    console.log("emito")
    socket.emit('join_room', { mode: 'Rapid' }); // Envía un evento al servidor para unirse al juego en modo Rapid
  };
  const handleClickJugarBUOnline = () => {
    args.updateMode('Bullet');
    setLoading(true);
    console.log("emito")
    socket.emit('join_room', { mode: 'Bullet' });
  }
  const handleClickJugarBLOnline = () => {
    args.updateMode('Blitz');
    setLoading(true);
    console.log("emito")
    socket.emit('join_room', { mode: 'Blitz' });
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
          <button className='close-button' onClick={handleClick}>
            <CloseIcon sx={{
              color:'#fff', 
              backgroundColor: 'transparent',
              height: 48, 
              width: 48,
            }}/>
          </button>
          <LocalMode />
          <OnlineMode />
        </div>
      </div>
    );
  }

  const handleCancelarBusqueda = () => {
    setLoading(false);
    socket.emit('cancel_search', { mode: args.gameMode }); // Avisar al servidor de la cancelación de búsqueda
  }

  const handleCancelarMatch = () => {
    setMatchFound(false); 
    socket.emit('cancel_match'); // Avisar al contrincante de la cancelación
  }

  const LoadingScreen = () => {
    return (
      <div className="overlay">
        <div className="spinner"></div>
        <h1 style={h1Style}>Buscando partida</h1>
        <button className='cancelButton' onClick={handleCancelarBusqueda}>Cancelar búsqueda</button>
      </div>
    );
  }

  const MatchFound = () => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
    const interval = setInterval(() => {
      // Decrease the countdown value by 1 every second
      if(countdown > 0){
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    // Clean up the interval when the component unmounts or when countdown reaches 0
      return () => clearInterval(interval);
    }, []); // Empty dependency array ensures that this effect runs only once
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
      {/* <h2>Menú</h2> */}
      <div><img className='logo' src={logo}/>  </div>
      <div className='listaSidebar'>
        <div className='botonJugarWrapper'> 
          {/* El boton de jugar solo aparece cuando se está en la pantalla "home" */}
          {!args.ingame && <button className='botonJugar' onClick={handleClick} /*disabled={loading}*/>
            Jugar
          </button>}
          {loading && <LoadingScreen />} {/* Pantalla de carga */}
          {matchFound && <MatchFound />}
          {gamesPopUp && <PopUpMenu />} {/* PopUp para escoger el modo de juego */}
        </div>
        {/* Opciones del sidebar*/}
        {args.ingame && <div><a href="/home">Menú principal</a></div>}
        <div><a href="#">Pase de Batalla</a></div>
        <div><a href="#">Ranking</a></div>
        <div><a href="#">Historial</a></div>
        <div><a href="#">Arenas</a></div>
        <div><a href="#">Personalización</a></div>
      </div>
    </div>
  );
}

export default SideBar;
