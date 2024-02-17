import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx"
function App() {
  return (
    <div className="App">
          <main className="content">
            <Routes>
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>
    </div>
  );
}

export default App;
