import React from "react";
import { useState } from "react";
import '../styles/BattlePass.css';
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckIcon from '@mui/icons-material/Check';

function BattlePass() {
  const [showSidebar, setShowSidebar] = useState(false); /* Mostrar o esconder el sideBar */
  /* Informacion del usuario relacionada con el battlePass */
  const [userBattlePass, setUserBattlePass] = useState({
    level: 4,
    points: 474,
    rewards: [{ name: '😀️', claimed: true }], 
    rewardsClaimed: 1,
  });

  /* Recompensas que ofrece el juego */
  const tiers = [
    { level: 1, reward: '', requiredPoints: '100' },
    { level: 2, reward: '', requiredPoints: '200' },
    { level: 3, reward: '', requiredPoints: '300' },
    { level: 4, reward: '', requiredPoints: '400' },
    { level: 5, reward: '', requiredPoints: '500' },
    { level: 6, reward: '', requiredPoints: '600' },
    { level: 7, reward: '', requiredPoints: '700' },
    { level: 8, reward: '', requiredPoints: '800' },
    { level: 9, reward: '', requiredPoints: '900' },
    { level: 10, reward: '', requiredPoints: '1000' },
    { level: 11, reward: '', requiredPoints: '1100' },
    { level: 12, reward: '', requiredPoints: '1200' },
    { level: 13, reward: '', requiredPoints: '1300' },
    { level: 14, reward: '', requiredPoints: '1400' },
    { level: 15, reward: '', requiredPoints: '1500' },
    { level: 16, reward: '', requiredPoints: '1600' },
    { level: 17, reward: '', requiredPoints: '1700' },
    { level: 18, reward: '', requiredPoints: '1800' },
    { level: 19, reward: '', requiredPoints: '1900' },
    { level: 20, reward: '', requiredPoints: '2000' },
    { level: 21, reward: '', requiredPoints: '2100' },
    { level: 22, reward: '', requiredPoints: '2200' },
    { level: 23, reward: '', requiredPoints: '2300' },
    { level: 24, reward: '', requiredPoints: '2400' },
    { level: 25, reward: '', requiredPoints: '2500' },
    { level: 26, reward: '', requiredPoints: '2600' },
    { level: 27, reward: '', requiredPoints: '2700' },
    { level: 28, reward: '', requiredPoints: '2800' },
    { level: 29, reward: '', requiredPoints: '2900' },
    { level: 30, reward: '', requiredPoints: '3000' },
  ];

  /* ¡¡¡¡¡¡ Temporal !!!!! */
/*   const updateLevel = () => {
    const newLevel = userBattlePass.points / 100;
    parseInt(newLevel);
    setUserBattlePass(prevState => ({
      ...prevState,
      level: newLevel,
    }));
  } */

  /* Reclamar recompensa seleccionada */
  const claimRewards = (tier) => {
    setUserBattlePass(prevState => ({
      ...prevState,
      rewards: [...prevState.rewards, { name: tier, claimed: true }],
      rewardsClaimed: userBattlePass.rewards.length,
    }));
  };

  /* Reclamar todas las recompensas disponibles */
  const claimAllRewards = () => {
    for(let i = userBattlePass.rewardsClaimed; i < userBattlePass.level; i++){
      claimRewards(tiers[i].reward);
    }
  }

  /* BattlePass */
  return (
    <div className="background-battlePass">
      <div className={showSidebar ? "sideBattlepass open" : "sideBattlepass"}>
        {/* sideBar */}
        <SideBar setShowSidebar={setShowSidebar}/>
      </div>
      <div className="titleBattlePass">
        {/* Botón para desplegar el sidebar */}
        <button className={!showSidebar ? "sideMenuButton" : "sideMenuButton hidden"} onClick={() => setShowSidebar(true)}>
          <MenuIcon sx={{
            color: '#fff',
            backgroundColor: 'transparent',
            height: 52,
            width: 52,
          }} />
        </button>
        {/* Título de la página */}
        <h1 className="pageTitleBattlepass">PASE DE BATALLA</h1>
      </div>
      <div className="battlePass-container">
        <div className="battlePass-container center">
          {/* Puntos disponibles del usuario */}
          <div className="battlePass-user">
            <h2 className="infoPuntos">Puntos disponibles: {userBattlePass.points}</h2>
          </div>
          {/* Recompensas */}
          <div className="recompensas">
            <ul className="battlePasslist">
              {/* Listado de las recompensas */}
              {tiers.map((tier, index) => (
                <li key={index}>
                  {/* Consultar si la recompensa está disponible o no, y si es el caso si ya ha sido reclamada o no */}
                  <div className={userBattlePass.level >= tier.level ?
                    (userBattlePass.rewards.find(rewards => rewards.name === tier.reward && rewards.claimed) ?
                      "items itemClaimed" : "items itemUnlocked") : ("items itemLocked")}>
                    {/* Información de la recompensa */}
                    <div className="infoRecompensa">
                      Recompensa {tier.level}
                      <p>Puntos requeridos : {tier.requiredPoints}</p>
                    </div>
                    <div style={{ fontSize: '24px' }}>
                      {tier.reward}
                    </div>
                    <div>
                      {/* Indicadores de si la recompensa está reclamada, disponible para reclamar o no disponible */}
                      {userBattlePass.level >= tier.level ?
                      (userBattlePass.rewards.find(rewards => rewards.name === tier.reward && rewards.claimed) ?
                      <CheckIcon /> : <LockOpenIcon />) : <LockIcon />}
                    </div>
                    {/* Botón asociado a la recompensa, para poder reclamarla */}
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
          {/* Botón para reclamar todas las recompensas disponibles */}
          <button onClick={claimAllRewards} className="claim-all-button">RECLAMAR TODAS</button>
        </div>
      </div>
    </div>
  );
}

export default BattlePass;