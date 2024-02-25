import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png'
import '../styles/Sidebar.css';

function SideBar({ ingame }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/game'); // Reemplaza '/nueva-pagina' con la URL de la página que quieres cargar
    }, 5000); // 5000 milisegundos = 5 segundos
  };
  return (
    <div className='Sidebar'>
      {/* <h2>Menú</h2> */}
      <div><img className='logo' src={logo}/>  </div>
      <div className='listaSidebar'>
        <div className='botonJugarWrapper'> 
          {!ingame && <button className='botonJugar' onClick={handleClick} disabled={loading}>
            Jugar
          </button>}
           {loading && <div className="overlay">
            <div className="spinner"></div>
            <h1>Buscando partida</h1>
          </div>}
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
