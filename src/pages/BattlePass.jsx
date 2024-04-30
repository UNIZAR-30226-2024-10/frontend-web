import React from "react";
import { useState, useEffect } from "react";
import '../styles/BattlePass.css';
import SideBar from '../components/SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckIcon from '@mui/icons-material/Check';
const apiUrl = process.env.REACT_APP_API_URL;

/* Imagenes de piezas */
import {
  AlphaWQ, AnarcandyWQ, CardinalWQ, DefaultWQ, CelticWQ, Chess7WQ, ChessnutWQ, CompanionWQ,   
  AlphaBK, AnarcandyBK, CardinalBK, DefaultBK, CelticBK, Chess7BK, ChessnutBK, CompanionBK,   
  KosalWQ, FrescaWQ, GovernorWQ, LeipzigWQ, MaestroWQ, MpchessWQ, PixelWQ, FantasyWQ,
  KosalBK, FrescaBK, GovernorBK, LeipzigBK, MaestroBK, MpchessBK, PixelBK, FantasyBK,
} from '../images/pieces'

function BattlePass({ userInfo }) {
  const [showSidebar, setShowSidebar] = useState(false); /* Mostrar o esconder el sideBar */
  /* Informacion del usuario relacionada con el battlePass */
  const [userBattlePass, setUserBattlePass] = useState({
    level: 0, // Nivel actual del usuario en función de sus puntos
    points: 0, // Puntos de recompensa del usuario 
    rewardsClaimed: 0, // Recompensas desbloqueadas por el usuario 
  });

  const [error, setError] = useState(null);
  useEffect(() => {

    const fetchUserData = async () => {
      // Pedir los puntos del usuario y el nivel en el que está
      try {
        const response = await fetch(`${apiUrl}/users/${userInfo.userId}`); // Construct URL using userId
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        console.log("info recibida",userData);
        // Guardar info del usuario que pueda ser util posteriormente
        setUserBattlePass(prevState => ({
          ...prevState,
          points : userData.puntospase, // Puntos del usuario
          rewardsClaimed : userData.recompensamasalta // Nivel actual del usuario
        }))
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUserData();
  }, []); 

  /* Recompensas que ofrece el juego */
  const tiers = [
    { level: 1, reward: '😁️', rewardType : 'emoticono', requiredPoints: '10' },
    { level: 2, reward: {K : AlphaBK, Q : AlphaWQ}, rewardType : 'pieza', requiredPoints: '20' },
    { level: 3, reward: '😂️', rewardType : 'emoticono', requiredPoints: '30' },
    { level: 4, reward: {K : CardinalBK, Q : CardinalWQ}, rewardType : 'pieza', requiredPoints: '40' },
    { level: 5, reward: '👍️', rewardType : 'emoticono', requiredPoints: '50' },
    { level: 6, reward: {K : CelticBK, Q : CelticWQ}, rewardType : 'pieza', requiredPoints: '60' },
    { level: 7, reward: '😲️', rewardType : 'emoticono', requiredPoints: '70' },
    { level: 8, reward: {K : Chess7BK, Q : Chess7WQ}, rewardType : 'pieza', requiredPoints: '80' },
    { level: 9, reward: '😭️', rewardType : 'emoticono', requiredPoints: '90' },
    { level: 10, reward: {K : ChessnutBK, Q : ChessnutWQ}, rewardType : 'pieza', requiredPoints: '100' },
    { level: 11, reward: '😅️', rewardType : 'emoticono', requiredPoints: '110' },
    { level: 12, reward: {K : CompanionBK, Q : CompanionWQ}, rewardType : 'pieza', requiredPoints: '120' },
    { level: 13, reward: '👊️', rewardType : 'emoticono', requiredPoints: '130' },
    { level: 14, reward: {K : FantasyBK, Q : FantasyWQ}, rewardType : 'pieza', requiredPoints: '140' },
    { level: 15, reward: '🤩️', rewardType : 'emoticono', requiredPoints: '150' },
    { level: 16, reward: {K : FrescaBK, Q : FrescaWQ}, rewardType : 'pieza', requiredPoints: '160' },
    { level: 17, reward: '🤯️', rewardType : 'emoticono', requiredPoints: '170' },
    { level: 18, reward: {K : GovernorBK, Q : GovernorWQ}, rewardType : 'pieza', requiredPoints: '180' },
    { level: 19, reward: '😜️', rewardType : 'emoticono', requiredPoints: '190' },
    { level: 20, reward: {K : KosalBK, Q : KosalWQ}, rewardType : 'pieza', requiredPoints: '200' },
    { level: 21, reward: '🫠️', rewardType : 'emoticono', requiredPoints: '210' },
    { level: 22, reward: {K : LeipzigBK, Q : LeipzigWQ}, rewardType : 'pieza', requiredPoints: '220' },
    { level: 23, reward: '😎️', rewardType : 'emoticono', requiredPoints: '230' },
    { level: 24, reward: {K : MpchessBK, Q : MpchessWQ}, rewardType : 'pieza', requiredPoints: '240' },
    { level: 25, reward: '😡️', rewardType : 'emoticono', requiredPoints: '250' },
    { level: 26, reward: {K : PixelBK, Q : PixelWQ}, rewardType : 'pieza', requiredPoints: '260' },
    { level: 27, reward: '😈️', rewardType : 'emoticono', requiredPoints: '270' },
    { level: 28, reward: {K : MaestroBK, Q : MaestroWQ}, rewardType : 'pieza', requiredPoints: '280' },
    { level: 29, reward: '👻️', rewardType : 'emoticono', requiredPoints: '290' },
    { level: 30, reward: {K : AnarcandyBK, Q : AnarcandyWQ}, rewardType : 'pieza', requiredPoints: '300' },
  ];


  useEffect(() => {
    // Calcular el nivel del usuario en funcion de los puntos 
    const updateLevel = () => {
      const newLevel = userBattlePass.points / 10;
      setUserBattlePass(prevState => ({
        ...prevState,
        level: parseInt(newLevel),
      }));
    }

    updateLevel();
  }, [userBattlePass.points]);

  /* Reclamar todas las recompensas disponibles */
  const claimAllRewards = async () => {
    setUserBattlePass(prevState => ({
      ...prevState,
      rewardsClaimed : userBattlePass.level,
    }));

    /* Mandar al backend el nuevo nivel de pase de batalla del usuario  */
  };

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
            <h2 className="infoPuntos">Puntos de recompensa: {userBattlePass.points}</h2>
          </div>
          {/* Recompensas */}
          <div className="recompensas">
            <ul className="battlePasslist">
              {/* Listado de las recompensas */}
              {tiers.map((tier, index) => (
                <li key={index}>
                  {/* Consultar si la recompensa está disponible o no, y si es el caso si ya ha sido reclamada o no */}
                  <div className={userBattlePass.level >= tier.level ?
                    (userBattlePass.rewardsClaimed >= tier.level ? "items itemClaimed" : "items itemUnlocked") : ("items itemLocked")}>
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
                      (userBattlePass.rewardsClaimed >= tier.level ?<CheckIcon /> : <LockOpenIcon />) : <LockIcon />}
                    </div>
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
