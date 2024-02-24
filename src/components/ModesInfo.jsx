import React from "react";
import '../styles/ModesInfo.css'

function ModesInfo() {

		const BulletInfo = "Bullet";
		const BlitzInfo = "Blitz";
		const RapidInfo = "Rapid";
		const BulletText = "Esta variante del juego se caracteriza por partidas extremadamente rápidas, \
		en las que cada jugador cuenta con un tiempo muy limitado para realizar sus movimientos."
		const BlitzText ="En el ajedrez relámpago, cada jugador tiene un tiempo máximo para realizar todos \
		sus movimientos. Por lo general, este tiempo varía entre 1 y 10 minutos por partida. Esto hace que \
		cada movimiento deba ser rápido y preciso, ya que no hay mucho margen para pensar demasiado.";
		const RapidText = "En el ajedrez rápido, los jugadores tienen un tiempo limitado para realizar sus movimientos.\
		A diferencia de las partidas clásicas, donde se cuenta con varias horas para pensar y planificar cada jugada, \
		en el ajedrez rápido el reloj es un factor determinante. \El tiempo máximo que se suele utilizar en el ajedrez \
		rápido es de 15 minutos por jugador,";

    return (
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
							{BulletText}
						</div>
					</div>
					<div className="box">
						<div className="box-title">
							{BlitzInfo}
						</div>
						<div className="box-text">
							{BlitzText}
						</div>
					</div>
					<div className="box">
						<div className="box-title">
							{RapidInfo}
						</div>	
						<div className="box-text">
							{RapidText}
						</div>
					</div>
				</div>
				<div className="more-info">
					Meter algo más?
				</div>
			</div>
    );
}

export default ModesInfo; 