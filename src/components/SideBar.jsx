import React from 'react';
import '../styles/Sidebar.css';

function SideBar() {
  return (
    <div className='Sidebar'>
      <h2>Menú</h2>
      <ul>
        <li><a href="#" className="active">Inicio</a></li>
        <li><a href="#">Perfil</a></li>
        <li><a href="#">Configuración</a></li>
        <li><a href="#">Ayuda</a></li>
      </ul>
    </div>
  );
}

export default SideBar;
