import React from "react";
import '../styles/Game.css'
import SideBar from "../components/SideBar";
function Game () {

  const InfoPlayers = ({ nombreJugador, eloJugador, colorFicha, tiempoRestante, fichasComidas}) => {
    return (
      <div>
        <div className="game-box">
          <div className="game-box-players">
            <div className="game-box-players-name"> {/* Nombre del jugador y su elo */}
              {nombreJugador} ({eloJugador})
            </div>
            <div className="game-box-players-token"> {/* Color de la ficha del jugador */}
              {colorFicha}
            </div>
          </div>
          <div className="game-box-time"> {/* Tiempo restante del jugador */}
            {tiempoRestante}
          </div>
          <div className="game-box-tokenEaten"> {/* Cantidad de fichas comidas por el jugador */}
            Fichas comidas: 
            {fichasComidas}
          </div> 
        </div>
      </div>
    );
  };

  const InfoGameMode = ({ GameMode }) => {
    return (
      <div className="game-info">
        {GameMode} {/* Modo de juego */}
      </div>
    );
  }

  return (
    <div className="game-background">
      <div className="game-menu"> {/* Temporal */}
        <div className="game-menu-sidebar">
          <SideBar />
        </div>
      </div>
      <div className="game-screen">
        <div>
          <InfoGameMode  GameMode="Rapid" /> {/* Cambiar en funcion del modo de juego  */}
        </div>
        <div className="game">
          <div>
            {/* Jugador 1 */}
            <InfoPlayers 
            nombreJugador='Jugador 1' 
            eloJugador='200' 
            colorFicha='Negras' 
            tiempoRestante='10 mins' 
            fichasComidas='0' />
          </div>
          {/* Tablero */}
          <div className="tablero"> {/*Introducir cuando este el tablero hecho */} 
            Tablero
          </div>
          <div>
            {/* Jugador 2 */}
            <InfoPlayers 
              nombreJugador='Jugador 2'
              eloJugador='200'  
              colorFicha='Blancas'
              tiempoRestante='10 mins' 
              fichasComidas='0' />
          </div>
        </div>
      </div>
      <div className="game-chat-box">
        <div className="game-chat">
          CHAT
        </div>
      </div>
    </div>
  );
}

export default Game;