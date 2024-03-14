import React from "react";
import '../styles/InfoHome.css';

function InfoHome() {

  const BulletInfo = "Bullet";
  const BlitzInfo = "Blitz";
  const RapidInfo = "Rapid";
  const BulletText = "Esta variante del juego se caracteriza por partidas extremadamente rápidas, \
	en las que cada jugador cuenta con un tiempo muy limitado para realizar sus movimientos."
  const BlitzText = "En el ajedrez Blitz, cada jugador tiene un tiempo máximo para realizar todos \
	sus movimientos. Esto hace que cada movimiento deba ser rápido y preciso, ya que no hay mucho \
  margen para pensar demasiado.";
  const RapidText = "En el ajedrez Rapid, los jugadores tienen un tiempo limitado para realizar sus movimientos.\
	A diferencia de las partidas clásicas, donde se cuenta con varias horas para pensar y planificar cada jugada, \
	en el ajedrez rápido el reloj es un factor determinante.";
  const QuienesSomos = "KSJ Games es una empresa creada por jóvenes estudiantes de ingeniería informática con una pasión \
	compartida por los videojuegos y la innovación tecnológica."

  return (
    /* Devuelve un cuadro informativo acerca de los diferentes modos de juego */
    <div className="infoHome-background">
      <div className="infoHome-title">
        MODOS DE JUEGO
      </div>
      <div className="infoHome-boxContainer">
        <div className="infoHome-box">
            <div className="infoHome-boxTitle">{BulletInfo}</div>
            <div className="infoHome-boxText">{BulletText}</div>
        </div>
        <div className="infoHome-box">
          <div className="infoHome-boxTitle">{BlitzInfo}</div>
          <div className="infoHome-boxText">{BlitzText}</div>
        </div>
        <div className="infoHome-box">
          <div className="infoHome-boxTitle">{RapidInfo}</div>
          <div className="infoHome-boxText">{RapidText}</div>
        </div>
      </div>
      <div className="infoHome-bottom">
        <div className="infoHome-bottomTitle">
          ¿Quienes somos?
        </div>
        <div className="infoHome-bottomText">{QuienesSomos}</div>
      </div>
    </div>
  );
}

export default InfoHome; 