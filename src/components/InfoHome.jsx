import React from "react";
import '../styles/InfoHome.css';
import '../styles/Sidebar.css';

function InfoHome() {

	const BulletInfo = "Bullet";
	const BlitzInfo = "Blitz";
	const RapidInfo = "Rapid";
	const BulletText = "Esta variante del juego se caracteriza por partidas extremadamente rápidas, \
	en las que cada jugador cuenta con un tiempo muy limitado para realizar sus movimientos."
	const BlitzText ="En el ajedrez Blitz, cada jugador tiene un tiempo máximo para realizar todos \
	sus movimientos. Esto hace que cada movimiento deba ser rápido y preciso, ya que no hay mucho \
  margen para pensar demasiado.";
	const RapidText = "En el ajedrez Rapid, los jugadores tienen un tiempo limitado para realizar sus movimientos.\
	A diferencia de las partidas clásicas, donde se cuenta con varias horas para pensar y planificar cada jugada, \
	en el ajedrez rápido el reloj es un factor determinante.";
	const QuienesSomos = "KSJ Games es una empresa creada por jóvenes estudiantes de ingeniería informática con una pasión \
	compartida por los videojuegos y la innovación tecnológica."

	return (
    /* Devuelve un cuadro informativo acerca de los diferentes modos de juego */
    <div className="background">
      <div className="game-modes-info">
        MODOS DE JUEGO
      </div>
      <div className="container">
        <div className="box">
          <div className="box-title">
            {BulletInfo}
          </div>
          <div className="box-text">
            <div>
              {BulletText}
            </div>
            <div className='botonJugarWrapper'> 
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-title">
            {BlitzInfo}
          </div>
          <div className="box-text">
            <div>
              {BlitzText}
            </div>
            <div className='botonJugarWrapper'> 
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-title">
            {RapidInfo}
          </div>	
          <div className="box-text">
            <div>
              {RapidText}
            </div>
            <div className='botonJugarWrapper'> 
            </div>
          </div>
        </div>
      </div>
      <div className="more-info">
        <div className="more-info-title">
          ¿Quienes somos?
        </div>
        <div className="more-info-text">
          {QuienesSomos}
        </div>
      </div>
    </div>
	);
}

export default InfoHome; 