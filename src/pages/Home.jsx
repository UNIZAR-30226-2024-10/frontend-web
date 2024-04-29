import React from 'react'
import Sidebar from '../components/SideBar'
import "../styles/Home.css"
import Navbar from '../components/NavBar'
import InfoHome from '../components/InfoHome'

function Home({ updateMode, gameMode, updatePlayersInGame, userInfo, updateUserInfo }) {
  const home = true;
  return (
    <div className='Home'>
      <div className='side'>
        <Sidebar inhome={home} updateMode={updateMode} gameMode={gameMode} updatePlayersInGame={updatePlayersInGame} />
      </div>
      <div className='cuerpo-home'>
        <div className='appbar'>
          <Navbar userInfo={userInfo} updateUserInfo={updateUserInfo}/> {/* Modifica el valor del hook para mostrar el perfil */}
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