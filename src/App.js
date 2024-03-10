import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Game from './pages/Game.jsx'
import Tablero from './components/Tablero.jsx'
import { GameMode } from './components/CustomHooks.jsx';

function App() {
  const {gameMode, updateMode} = GameMode();
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home updateMode={updateMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/game' element={<Game gameMode={gameMode} />} />
        <Route path='/tablero' element={<Tablero />} />
      </Routes>
    </div>
  );
}

export default App;
