import React from "react";
import { useState } from "react";
import '../styles/BattlePass.css';
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';


function Ranking() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [userBattlePass, setUserBattlePass] = useState({
    level: 3,
    points: 474,
    rewards: [{ name: '500 coins', claimed: true }], 
    rewardsClaimed: 1,
  });


  return (
    <div className="background-battlePass">
      <div className={showSidebar ? "sideBattlepass open" : "sideBattlepass"}>
        <SideBar setShowSidebar={setShowSidebar}/>
      </div>
      <div className="battlePass-container">
        <button className={!showSidebar ? "sideMenuButton" : "sideMenuButton hidden"} onClick={() => setShowSidebar(true)}>
          <MenuIcon sx={{
            color: '#fff',
            backgroundColor: 'transparent',
            height: 52,
            width: 52,
          }} />
        </button>
        ai coño
        
      </div>
    </div>
  );
}

export default Ranking;