import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Game from './pages/Game.jsx'
import Ranking from './pages/Ranking.jsx';
import { GameMode } from './components/CustomHooks.jsx';
import GameOnline from './pages/GameOnline.jsx';
import {SocketContext, socket} from './context/socket';
import BattlePass from './pages/BattlePass.jsx';
import { PlayersInGame } from './components/CustomHooks.jsx';



function App() {
  const {gameMode, updateMode} = GameMode(); /* Hook para modificar el modo de juego */
  const {playersInfo, updatePlayersInGame} = PlayersInGame(); /* Hook para almacenar los jugadores de una partida */
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home updateMode={updateMode} gameMode={gameMode} updatePlayersInGame={updatePlayersInGame}/>} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/battlePass' element={<BattlePass />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/game' element={<Game gameMode={gameMode} />} />
          <Route path='/gameOnline/:roomId/:colorSuffix' element={<GameOnline gameMode={gameMode} playersInfo={playersInfo} />} />
        </Routes>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
