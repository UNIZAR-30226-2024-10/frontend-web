import React from 'react'
import { useEffect, useState } from 'react'
import Sidebar from '../components/SideBar'
import "../styles/Home.css"
import Navbar from '../components/NavBar'
import InfoHome from '../components/InfoHome'
const apiUrl = process.env.REACT_APP_API_URL;

function Home( args ) {
  const home = true;
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchUserData = async () => {
      // Pedir toda la info del usuario
      try {
        const response = await fetch(`${apiUrl}/users/${args.userInfo.userId}`); // Construct URL using userId
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        console.log(userData);
        // Guardar info del usuario que pueda ser util posteriormente
        args.updateUserInfo({ field : "userName", value : userData.nombre });
        args.updateUserInfo({ field : "eloBlitz", value : userData.eloblitz });
        args.updateUserInfo({ field : "eloBullet", value : userData.elobullet });
        args.updateUserInfo({ field : "eloRapid", value : userData.elorapid });
        args.updateUserInfo({ field : "avatarImage", value : userData.avatar });
        args.updateUserInfo({ field : "avatarColor", value : userData.color });
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className='Home'>
      <div className='side'>
        <Sidebar inhome={home} updateMode={args.updateMode} gameMode={args.gameMode} updatePlayersInGame={args.updatePlayersInGame} />
      </div>
      <div className='cuerpo-home'>
        <div className='appbar'>
          <Navbar userInfo={args.userInfo} updateUserInfo={args.updateUserInfo} resetUserInfo={args.resetUserInfo}/> {/* Modifica el valor del hook para mostrar el perfil */}
        </div>
        <div className='middle'>
            <div className='middle-recuadros'>
              <InfoHome />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home