import React from "react";
import { useState } from "react";
import '../styles/BattlePass.css';
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckIcon from '@mui/icons-material/Check';

/* Imagenes de piezas */
import alphaK from '../images/pieces/alpha/bK.svg';
import cardinalK from '../images/pieces/cardinal/bK.svg';
import celticK from '../images/pieces/celtic/bK.svg';
import chess7K from '../images/pieces/chess7/bK.svg';
import chessnutK from '../images/pieces/chessnut/bK.svg';
import companionK from '../images/pieces/companion/bK.svg';
import fantasyK from '../images/pieces/fantasy/bK.svg';
import frescaK from '../images/pieces/fresca/bK.svg';
import governorK from '../images/pieces/governor/bK.svg';
import kosalK from '../images/pieces/kosal/bK.svg';
import leipzigK from '../images/pieces/leipzig/bK.svg';
import mpchessK from '../images/pieces/mpchess/bK.svg';
import pixelK from '../images/pieces/pixel/bK.svg';
import maestroK from '../images/pieces/maestro/bK.svg';
import anarcandyK from '../images/pieces/anarcandy/bK.svg';

import alphaQ from '../images/pieces/alpha/wQ.svg';
import cardinalQ from '../images/pieces/cardinal/wQ.svg';
import celticQ from '../images/pieces/celtic/wQ.svg';
import chess7Q from '../images/pieces/chess7/wQ.svg';
import chessnutQ from '../images/pieces/chessnut/wQ.svg';
import companionQ from '../images/pieces/companion/wQ.svg';
import fantasyQ from '../images/pieces/fantasy/wQ.svg';
import frescaQ from '../images/pieces/fresca/wQ.svg';
import governorQ from '../images/pieces/governor/wQ.svg';
import kosalQ from '../images/pieces/kosal/wQ.svg';
import leipzigQ from '../images/pieces/leipzig/wQ.svg';
import mpchessQ from '../images/pieces/mpchess/wQ.svg';
import pixelQ from '../images/pieces/pixel/wQ.svg';
import maestroQ from '../images/pieces/maestro/wQ.svg';
import anarcandyQ from '../images/pieces/anarcandy/wQ.svg';

function BattlePass() {
  const [showSidebar, setShowSidebar] = useState(false); /* Mostrar o esconder el sideBar */
  /* Informacion del usuario relacionada con el battlePass */
  const [userBattlePass, setUserBattlePass] = useState({
    level: 7,
    points: 34,
    rewards: [{ level: 1, claimed : true }], 
    rewardsClaimed: 1,
  });

  /* Recompensas que ofrece el juego */
  const tiers = [
    { level: 1, reward: '😁️', rewardType : 'emoticono', requiredPoints: '10' },
    { level: 2, reward: {K : alphaK, Q : alphaQ}, rewardType : 'pieza', requiredPoints: '20' },
    { level: 3, reward: '😂️', rewardType : 'emoticono', requiredPoints: '30' },
    { level: 4, reward: {K : cardinalK, Q : cardinalQ}, rewardType : 'pieza', requiredPoints: '40' },
    { level: 5, reward: '👍️', rewardType : 'emoticono', requiredPoints: '50' },
    { level: 6, reward: {K : celticK, Q : celticQ}, rewardType : 'pieza', requiredPoints: '60' },
    { level: 7, reward: '😎️', rewardType : 'emoticono', requiredPoints: '70' },
    { level: 8, reward: {K : chess7K, Q : chess7Q}, rewardType : 'pieza', requiredPoints: '80' },
    { level: 9, reward: '😭️', rewardType : 'emoticono', requiredPoints: '90' },
    { level: 10, reward: {K : chessnutK, Q : chessnutQ}, rewardType : 'pieza', requiredPoints: '100' },
    { level: 11, reward: '😅️', rewardType : 'emoticono', requiredPoints: '110' },
    { level: 12, reward: {K : companionK, Q : companionQ}, rewardType : 'pieza', requiredPoints: '120' },
    { level: 13, reward: '👊️', rewardType : 'emoticono', requiredPoints: '130' },
    { level: 14, reward: {K : fantasyK, Q : fantasyQ}, rewardType : 'pieza', requiredPoints: '140' },
    { level: 15, reward: '🤩️', rewardType : 'emoticono', requiredPoints: '150' },
    { level: 16, reward: {K : frescaK, Q : frescaQ}, rewardType : 'pieza', requiredPoints: '160' },
    { level: 17, reward: '🤯️', rewardType : 'emoticono', requiredPoints: '170' },
    { level: 18, reward: {K : governorK, Q : governorQ}, rewardType : 'pieza', requiredPoints: '180' },
    { level: 19, reward: '😜️', rewardType : 'emoticono', requiredPoints: '190' },
    { level: 20, reward: {K : kosalK, Q : kosalQ}, rewardType : 'pieza', requiredPoints: '200' },
    { level: 21, reward: '🫠️', rewardType : 'emoticono', requiredPoints: '210' },
    { level: 22, reward: {K : leipzigK, Q : leipzigQ}, rewardType : 'pieza', requiredPoints: '220' },
    { level: 23, reward: '😎️', rewardType : 'emoticono', requiredPoints: '230' },
    { level: 24, reward: {K : mpchessK, Q : mpchessQ}, rewardType : 'pieza', requiredPoints: '240' },
    { level: 25, reward: '😡️', rewardType : 'emoticono', requiredPoints: '250' },
    { level: 26, reward: {K : pixelK, Q : pixelQ}, rewardType : 'pieza', requiredPoints: '260' },
    { level: 27, reward: '😈️', rewardType : 'emoticono', requiredPoints: '270' },
    { level: 28, reward: {K : maestroK, Q : maestroQ}, rewardType : 'pieza', requiredPoints: '280' },
    { level: 29, reward: '👻️', rewardType : 'emoticono', requiredPoints: '290' },
    { level: 30, reward: {K : anarcandyK, Q : anarcandyQ}, rewardType : 'pieza', requiredPoints: '300' },
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
      rewards: [...prevState.rewards, { level: tier, claimed: true }],
      rewardsClaimed: userBattlePass.rewards.length,
    }));
  };

  /* Reclamar todas las recompensas disponibles */
  const claimAllRewards = () => {
    for(let i = userBattlePass.rewardsClaimed; i < userBattlePass.level; i++){
      claimRewards(tiers[i].level);
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
          <div>
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
                    (userBattlePass.rewards.find(rewards => rewards.level === tier.level && rewards.claimed) ?
                      "items itemClaimed" : "items itemUnlocked") : ("items itemLocked")}>
                    {/* Información de la recompensa */}
                    <div className="infoRecompensa">
                      Recompensa {tier.level}
                      <p>Puntos requeridos : {tier.requiredPoints}</p>
                    </div>
                    {tier.rewardType == 'emoticono' && <div style={{ fontSize: '65px' }}>
                      {tier.reward}
                    </div>}
                    {tier.rewardType == 'pieza' && <div>
                      <img className = "imagenBattlePass" src={tier.reward.K} alt='Pieza' />
                      <img className = "imagenBattlePass" src={tier.reward.Q} alt='Pieza' />
                    </div>}
                    <div>
                      {/* Indicadores de si la recompensa está reclamada, disponible para reclamar o no disponible */}
                      {userBattlePass.level >= tier.level ?
                      (userBattlePass.rewards.find(rewards => rewards.name === tier.reward && rewards.claimed) ?
                      <CheckIcon /> : <LockOpenIcon />) : <LockIcon />}
                    </div>
                    {/* Botón asociado a la recompensa, para poder reclamarla */}
                    <button disabled={userBattlePass.rewards.find(rewards => rewards.name === tier.reward && rewards.claimed) || userBattlePass.level < tier.level}
                      onClick={() => claimRewards(tier.level)}
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