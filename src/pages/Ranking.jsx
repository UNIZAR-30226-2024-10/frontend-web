  import React from "react";
  import { useState, useEffect } from "react";
  import '../styles/Ranking.css';
  import SideBar from '../components/SideBar';
  import MenuIcon from '@mui/icons-material/Menu';
  import TablaRanking from "../components/TablaRanking";
  const apiUrl = process.env.REACT_APP_API_URL;


function Ranking() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [data, setData] = useState(null);

  const estilo = {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  }

  //Obtencion rankings de las 3 modalidades
  useEffect(() => {
    Promise.all([ //Se hacen concurrentemente las 3 llamadas a la API
      fetch(`${apiUrl}/users/leaderboard/bullet`).then(response => response.json()),
      fetch(`${apiUrl}/users/leaderboard/rapid`).then(response => response.json()),
      fetch(`${apiUrl}/users/leaderboard/blitz`).then(response => response.json())
    ])
    .then(([bulletData, rapidData, blitzData]) => {
      setData({ //Se concatenan los rankings de las tres modalidades en un json
        bullet: bulletData,
        rapid: rapidData,
        blitz: blitzData
      });
    })
    .catch(error => console.error('Error:', error));
  }, []);

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
        <h1 className="pageTitleBattlepass">RANKING GLOBAL</h1>
      </div>
      {/* <div className="battlePass-container"> */}
        <div style={estilo}>
          <div>{data && <TablaRanking data={data.bullet} modalidad={'Bullet'}/>}</div>
          <div>{data && <TablaRanking data={data.rapid} modalidad={'Rapid'}/>}</div>
          <div>{data && <TablaRanking data={data.blitz} modalidad={'Blitz'}/>}</div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Ranking;