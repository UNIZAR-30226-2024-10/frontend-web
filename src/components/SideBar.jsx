import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png'
import '../styles/Sidebar.css';
import CloseIcon from '@mui/icons-material/Close';

function SideBar({ ingame, updateMode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Hook para simular la pantalla de carga
  const [gamesPopUp, setGamesPopUp] = useState(false); // Hook para mostrar los modos de juego

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
    updateMode('Rapid');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/game'); // Reemplaza '/nueva-pagina' con la URL de la página que quieres cargar
    }, 5000); // 5000 milisegundos = 5 segundos
  }
  const handleClickJugarBU = () => {
    updateMode('Bullet');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/game'); // Reemplaza '/nueva-pagina' con la URL de la página que quieres cargar
    }, 5000); // 5000 milisegundos = 5 segundos
  }
  const handleClickJugarBL = () => {
    updateMode('Blitz');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/game'); // Reemplaza '/nueva-pagina' con la URL de la página que quieres cargar
    }, 5000); // 5000 milisegundos = 5 segundos
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

  const OnlineMode = () => {
    return (
      /* Modos de juego para partidas online */
      <div className='popUp-content-info'>
        <div className='popUp-content-info-title'>
          JUGAR EN MODO ONLINE
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
          {/*<OnlineMode />*/}
        </div>
      </div>
    );
  }

  const LoadingScreen = () => {
    return (
      <div className="overlay">
        <div className="spinner"></div>
        <h1 style={h1Style}>Buscando partida</h1>
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
          {!ingame && <button className='botonJugar' onClick={handleClick} /*disabled={loading}*/>
            Jugar
          </button>}
          {loading && <LoadingScreen />} {/* Pantalla de carga */}
          {gamesPopUp && <PopUpMenu />} {/* PopUp para escoger el modo de juego */}
        </div>
        {/* Opciones del sidebar*/}
        {ingame && <div><a href="/home">Menú principal</a></div>}
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
