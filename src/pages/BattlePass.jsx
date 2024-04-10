import React from "react";
import { useState } from "react";
import '../styles/BattlePass.css';
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckIcon from '@mui/icons-material/Check';

function BattlePass() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [userBattlePass, setUserBattlePass] = useState({
    level: 4,
    points: 474,
    rewards: [{ name: '😀️', claimed: true }], 
    rewardsClaimed: 1,
  });


  const tiers = [ // Conjunto de recompensas que ofrece el juego
    { level: 1, reward: '😀️', requiredPoints: '100' },
    { level: 2, reward: '😂️', requiredPoints: '200' },
    { level: 3, reward: '😁️', requiredPoints: '300' },
    { level: 4, reward: '🫠️', requiredPoints: '400' },
    { level: 5, reward: '😅️', requiredPoints: '500' },
    { level: 6, reward: '🤑️', requiredPoints: '600' },
    { level: 7, reward: '🤗️', requiredPoints: '700' },
    { level: 8, reward: '🤗️', requiredPoints: '800' },
    { level: 9, reward: '🤗️', requiredPoints: '900' },
    { level: 10, reward: '🤗️', requiredPoints: '1000' },
    { level: 11, reward: '🤗️', requiredPoints: '1100' },
    { level: 12, reward: '🤗️', requiredPoints: '1200' },
  ];

  const updateLevel = () => {
    const newLevel = userBattlePass.points / 100;
    parseInt(newLevel);
    setUserBattlePass(prevState => ({
      ...prevState,
      level: newLevel,
    }));
  }

  const claimRewards = (tier) => {
    setUserBattlePass(prevState => ({
      ...prevState,
      rewards: [...prevState.rewards, { name: tier, claimed: true }],
      rewardsClaimed: userBattlePass.rewards.length,
    }));
  };

  const claimAllRewards = () => {
    for(let i = userBattlePass.rewardsClaimed; i < userBattlePass.level; i++){
      claimRewards(tiers[i].reward);
    }
  }

  return (
    <div className="background-battlePass">
      <div className={showSidebar ? "sideBattlepass open" : "sideBattlepass"}>
        <SideBar setShowSidebar={setShowSidebar}/>
      </div>
      <div className="battlePass-container">
        {/* Botón para desplegar el sidebar */}
        <button className={!showSidebar ? "sideMenuButton" : "sideMenuButton hidden"} onClick={() => setShowSidebar(true)}>
          <MenuIcon sx={{
            color: '#fff',
            backgroundColor: 'transparent',
            height: 52,
            width: 52,
          }} />
        </button>
        <h1 className="pageTitle">PASE DE BATALLA</h1>
        <div className="battlePass-container center">
          <div className="battlePass-user">
            <h2 className="infoPuntos">Puntos disponibles: {userBattlePass.points}</h2>
          </div>
          <div className="recompensas">
            <ul className="list">
              {/* Recompensas */}
              {tiers.map((tier, index) => (
                <li key={index}>
                  {/* Consultar si la recompensa está disponible o no, y si es el caso si ya ha sido reclamada o no */}
                  <div className={userBattlePass.level >= tier.level ?
                    (userBattlePass.rewards.find(rewards => rewards.name === tier.reward && rewards.claimed) ?
                      "items itemClaimed" : "items itemUnlocked") : ("items itemLocked")}>
                    <div className="infoRecompensa">
                      Recompensa {tier.level}
                      <p>Puntos requeridos : {tier.requiredPoints}</p>
                    </div>
                    <div style={{ fontSize: '24px' }}>
                      {tier.reward}
                    </div>
                    <div>
                      {userBattlePass.level >= tier.level ?
                      (userBattlePass.rewards.find(rewards => rewards.name === tier.reward && rewards.claimed) ?
                      <CheckIcon /> : <LockOpenIcon />) : <LockIcon />}
                    </div>
                    <button disabled={userBattlePass.rewards.find(rewards => rewards.name === tier.reward && rewards.claimed) || userBattlePass.level < tier.level}
                      onClick={() => claimRewards(tier.reward)}
                      className="claim-button">
                      RECLAMAR RECOMPENSA
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button onClick={claimAllRewards} className="claim-all-button">RECLAMAR TODAS</button>
        </div>
      </div>
    </div>
  );
}

export default BattlePass;