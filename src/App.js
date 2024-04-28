import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Game from './pages/Game.jsx'
import Ranking from './pages/Ranking.jsx';
import GameOnline from './pages/GameOnline.jsx';
import GameAsync from './pages/GameAsync.jsx';
import BattlePass from './pages/BattlePass.jsx';
import Arenas from './pages/Arenas.jsx';
import Personalizacion from './pages/Personalizacion.jsx';
import UserProfile from './pages/UserProfile.jsx';
import EditCredentials from './pages/EditCredentials.jsx';
import { GameMode, PlayersInGame, UserInfo, ShowUserProfile } from './components/CustomHooks.jsx';
import {SocketContext, socket} from './context/socket';

function App() {
  const {gameMode, updateMode} = GameMode(); /* Hook para modificar el modo de juego */
  const {playersInfo, updatePlayersInGame} = PlayersInGame(); /* Hook para almacenar los jugadores de una partida */
  /* Hook para almacenar toda la información acerca de un usuaio */
  const {userInfo, updateUserInfo} = UserInfo();
  const {userProfileVisibility, updateUserProfileVisibility} = ShowUserProfile();
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home updateMode={updateMode} gameMode={gameMode} /* Esto quizas sobra → */updatePlayersInGame={updatePlayersInGame} /* ← */ userInfo={userInfo} updateUserInfo={updateUserInfo}/>} />
          <Route path="/login" element={<Login updateUserInfo={updateUserInfo}/>} />
          <Route path='/signup' element={<SignUp updateUserInfo={updateUserInfo}/>} />
          <Route path='/cambio-credenciales' element={<EditCredentials />} />
          <Route path='/profile' element={<UserProfile userProfileVisibility={userProfileVisibility} updateUserProfileVisibility={updateUserProfileVisibility}/>} />
          <Route path='/battlePass' element={<BattlePass />} />
          <Route path='/ranking' element={<Ranking />} />
          <Route path='/arenas' element={<Arenas />} />
          <Route path='/personalizacion' element={<Personalizacion />} />
          <Route path='/game' element={<Game gameMode={gameMode} />} />
          <Route path='/gameOnline/:roomId/:colorSuffix' element={<GameOnline gameMode={gameMode} playersInfo={playersInfo} />} />
          <Route path='/gameAsync/' element={<GameAsync gameMode={gameMode} playersInfo={playersInfo} />} />

        </Routes>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
