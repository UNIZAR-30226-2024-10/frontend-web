import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png'
import '../styles/Sidebar.css';

function SideBar({ ingame }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gamesPopUp, setGamesPopUp] = useState(false);

  const handleClick = () => {
    setGamesPopUp(!gamesPopUp);
  };

  const handleClickJugar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/game'); // Reemplaza '/nueva-pagina' con la URL de la página que quieres cargar
    }, 5000); // 5000 milisegundos = 5 segundos*/
  }

  const LocalMode = () => {
    return (
      <div className='popUp-content-info'>
        <div className='popUp-content-info-title'>
          MODO LOCAL
        </div>
        <div className='popUp-content-info-modes'>
          <button className='popUp-modes' onClick={handleClickJugar}>RAPID</button>
          <div>
            |
          </div>
          <button className='popUp-modes' onClick={handleClickJugar}>BULLET</button>
          <div>
            |
          </div>
          <button className='popUp-modes' onClick={handleClickJugar}>BLITZ</button>
        </div>
      </div>
    );
  }

  const OnlineMode = () => {
    return (
      <div className='popUp-content-info'>
        <div className='popUp-content-info-title'>
          MODO ONLINE
        </div>
        <div className='popUp-content-info-modes'>
          <button className='popUp-modes' onClick={handleClickJugar}>RAPID</button>
          <div>
            |
          </div>
          <button className='popUp-modes' onClick={handleClickJugar}>BULLET</button>
          <div>
            |
          </div>
          <button className='popUp-modes' onClick={handleClickJugar}>BLITZ</button>
        </div>
      </div>
    );
  }

  const PopUpMenu = () => {
    return (
      <div className='popUp'>
        <div className='popUp-content'>
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
        <h1>Buscando partida</h1>
      </div>
    );
  }

  return (
    <div className='Sidebar'>
      {/* <h2>Menú</h2> */}
      <div><img className='logo' src={logo}/>  </div>
      <div className='listaSidebar'>
        <div className='botonJugarWrapper'> 
          {!ingame && <button className='botonJugar' onClick={handleClick} /*disabled={loading}*/>
            Jugar
          </button>}
          {loading && <LoadingScreen />}
          {gamesPopUp && <PopUpMenu />}
        </div>
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
