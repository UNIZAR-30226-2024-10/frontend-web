import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Game.css'
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import TableroAsync from '../components/TableroAsync';
import AMatriz from '../components/AMatriz';
const apiUrl = process.env.REACT_APP_API_URL;
import { UserInfo, ShowUserProfile } from "../components/CustomHooks";

function GameAsync({ gameMode, userInfo }) {
  const [showSidebar, setShowSidebar] = useState(false); /* Mostrar o esconder el sideBar */
  const navigate = useNavigate();
  const [userArenas, setUserArenas] = useState({
    elo: 1200,
    arena: 'MADERA', // Actualizar segun el usuario
  });
  /* const {userInfo, setUserInfo} = UserInfo() */

  const playingGame = true; /* Indica al sideBar de que este componente se está usando en partida */
  const [wantToQuit, setWantToQuit] = useState(false); /* Indica que un jugador quiere abandonar la partida */
  const [confirmSurrender, setConfirmSurrender] = useState(false); /* Contiene los diferentes estados de la partida */
  const { id } = useParams();
 const [tableroNuevo, setTableroNuevo] = useState(null);
    const inicial = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['' , '' , '' , '' ,'' , '' , '' , '' ],
        ['' , '' , '' , '' ,'' , '' , '' , '' ],
        ['' , '' , '' , '' ,'' , '' , '' , '' ],
        ['' , '' , '' , '' ,'' , '' , '' , '' ],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ]
    const [idMio, setIdMio] = useState(null)
    const [idRival, setIdRival] = useState(null)
    const [colorSuffix, setColorSuffix]=useState(null)
    const [turno, setTurno]=useState(null)
  useEffect(() => {
    // Lógica para obtener el tablero de una API
    const fetchTablero = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/get_partida_asincrona/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el tablero');
        }
        const data = await response.json();
        console.log("data", data)
        console.log(userInfo.userId)
        if(data[0].usuarioblancasid.toString()===userInfo.userId){
          setColorSuffix(0);
        }else{
          setColorSuffix(1);
        }
        if(data[0].tablero===null){
          setTableroNuevo(inicial)
          setTurno(0);
        }else{
          const tableroString = data[0].tablero.replace(/\\/g, '');
          const tableroJson = JSON.parse(tableroString);
          if(tableroJson.turno === 'blancas' && data[0].usuarioblancasid.toString()===userInfo.userId){
            setTurno(0);
          }else if (tableroJson.turno === 'negras' && data[0].usuarionegrasid.toString()===userInfo.userId){
            setTurno(1);
          }
          // setTablero(data[0].tablero); // Asumiendo que la respuesta de la API tiene una propiedad 'tablero'
          const matriz = AMatriz({jsonData:tableroJson});
          setTableroNuevo(matriz);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTablero();

    // Es importante limpiar los efectos si el componente se desmonta o se vuelve a montar
    return () => {
      // Lógica de limpieza si es necesaria
    };
  }, []);
  /* Cuadros informativos para cada uno de los jugadores */
  const InfoPlayers = ({numJugador, nombreJugador, eloJugador, colorFicha, fichasComidas }) => {
    return (
      <div className="gameInfo">
        <div className="gameInfo players">
          <div className="gameInfo players name"> {/* Nombre del jugador y su elo */}
            Usuario : {nombreJugador} 
          </div>
          <div className="gameInfo players color"> {/* Color de la ficha del jugador */}
            Elo : ({eloJugador})
          </div>
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

   useEffect(() => {
      // Calcular la arena en la que va a jugar el usuario
      if (gameMode === 'Rapid'){
        setUserArenas(prevState => ({
          ...prevState,
          elo : userInfo.eloRapid,
        }))
      }else if (gameMode === 'Bullet') {
        setUserArenas(prevState => ({
          ...prevState,
          elo : userInfo.eloBullet,
        }))
      }else if (gameMode === 'Blitz') {
        setUserArenas(prevState => ({
          ...prevState,
          elo : userInfo.eloBlitz,
        }))
      }
    },[])
  
    useEffect(() => {
      if (userArenas.elo < 1500) {
        setUserArenas(prevState => ({
          ...prevState,
          arena : 'MADERA',
        }))
      } 
      else if (userArenas.elo >= 1500 && userArenas.elo < 1800) {
        setUserArenas(prevState => ({
          ...prevState,
          arena : 'MARMOL',
        }))
      }
      else if (userArenas.elo >= 1800 && userArenas.elo < 2100) {
        setUserArenas(prevState => ({
          ...prevState,
          arena : 'ORO',
        }))
      }
      else if (userArenas.elo >= 2100 && userArenas.elo < 2400) {
        setUserArenas(prevState => ({
          ...prevState,
          arena : 'ESMERALDA',
        }))
      }
      else if (userArenas.elo > 2400) {
        setUserArenas(prevState => ({
          ...prevState,
          arena : 'DIAMANTE',
        }))
      }
    },[userArenas.elo])

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
            nombreJugador={userInfo.opponentName}
            eloJugador='200'/>
          {/* Tablero */}
          <div className='tableroGame'>
            <GamePopup />
            <TableroAsync arena={userArenas.arena} setVictory={setGameState} tableroNuevo={tableroNuevo} id_partida={id} blancasAbajo={colorSuffix===0} turno={turno} setTurno={setTurno} userInfo={userInfo}/>
          </div>
          {/* Jugador 2 */}
          <InfoPlayers
            numJugador='2'
            nombreJugador={userInfo.userName}
            eloJugador='200'/>
        </div>
      </div>
    </div>
  );
}

export default GameAsync;