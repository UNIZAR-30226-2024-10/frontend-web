import React from 'react';

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Game from './pages/Game.jsx'
import { GameMode } from './components/CustomHooks.jsx';
import GameOnline from './pages/GameOnline.jsx';
import {SocketContext, socket} from './context/socket';

function App() {
  const {gameMode, updateMode} = GameMode();
  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home updateMode={updateMode} />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/game' element={<Game gameMode={gameMode} />} />
          <Route path='/gameOnline/:roomId/:colorSuffix' element={<GameOnline gameMode={gameMode}/>} />
          {/*<Route path='/tablero' element={<Tablero />} /> */}
        </Routes>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
