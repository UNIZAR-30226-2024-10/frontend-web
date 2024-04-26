import React from 'react'
import Sidebar from '../components/SideBar'
import "../styles/Home.css"
import Navbar from '../components/NavBar'
import InfoHome from '../components/InfoHome'
import { AvatarSelector, ShowUserProfile } from '../components/CustomHooks'

function Home({ updateMode, gameMode, updatePlayersInGame, userInfo, updateUserInfo }) {
  const {updateUserProfileVisibility} = ShowUserProfile(); /* Hook para mostrar el perfil del usuario */
  const {avatar} = AvatarSelector(); /* Hook para permitir el cambio de avatar del usuario */
  const home = true;
  return (
    <div className='Home'>
      <div className='side'>
        <Sidebar inhome={home} updateMode={updateMode} gameMode={gameMode} updatePlayersInGame={updatePlayersInGame} />
      </div>
      <div className='cuerpo-home'>
        <div className='appbar'>
          <Navbar updateUserProfileVisibility={updateUserProfileVisibility} avatar={avatar} userInfo={userInfo} updateUserInfo={updateUserInfo}/> {/* Modifica el valor del hook para mostrar el perfil */}
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