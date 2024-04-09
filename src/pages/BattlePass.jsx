import React from "react";
import { useState } from "react";
import '../styles/BattlePass.css';
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function BattlePass() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [userBattlePass, setUserBattlePass] = useState({
    level: 3,
    points: 374,
    rewards: [{ name: '500 coins', claimed: true }], 
    rewardsClaimed: 1,
  });

  const tiers = [ // Conjunto de recompensas que ofrece el juego
    { level: 1, reward: '500 coins', requiredPoints: '100' },
    { level: 2, reward: 'Bronze badge', requiredPoints: '200' },
    { level: 3, reward: '1000 coins', requiredPoints: '300' },
    { level: 4, reward: 'Silver badge', requiredPoints: '400' },
    { level: 5, reward: '1500 coins', requiredPoints: '500' },
    { level: 6, reward: 'Gold badge', requiredPoints: '600' },
    { level: 7, reward: '510 coins', requiredPoints: '700' },
    { level: 8, reward: 'Bonze badge', requiredPoints: '800' },
    { level: 9, reward: '1100 coins', requiredPoints: '900' },
    { level: 10, reward: 'Slver badge', requiredPoints: '1000' },
    { level: 11, reward: '1520 coins', requiredPoints: '1100' },
    { level: 12, reward: 'God badge', requiredPoints: '1200' },
  ];

  const updateLevel = () => {
    const newLevel = userBattlePass.points / 100;
    parseInt(newLevel);
    console.log(newLevel);
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
      {console.log("showing sidebar",showSidebar)}
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
        <div className="battlePass-user">
          <h2>Tus Puntos: {userBattlePass.points}</h2>
        </div>
        <div className="recompensas">
          <ul className="list">
            {tiers.map((tier, index) => (
              <li key={index}>
                <div className={userBattlePass.level >= tier.level ?
                  (userBattlePass.rewards.find(rewards => rewards.name === tier.reward && rewards.claimed) ?
                    "itemClaimed" : "itemUnlocked") : ("itemLocked")}>
                  <div>
                    Recompensa {tier.level} :
                    <div>
                      Puntos requeridos : {tier.requiredPoints}
                    </div>
                  </div>
                  <div style={{ textDecoration: 'underline' }}>
                    {tier.reward}
                  </div>
                  <button disabled={userBattlePass.rewards.find(rewards => rewards.name === tier.reward && rewards.claimed) || userBattlePass.level < tier.level}
                    onClick={() => claimRewards(tier.reward)}
                    className="claim-button">
                    Reclamar recompensa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={claimAllRewards} className="claim-all-button">Claim All</button>
      </div>
    </div>
  );
}

export default BattlePass;