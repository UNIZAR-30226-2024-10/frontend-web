import React from 'react'
import Sidebar from '../components/SideBar'
import "../styles/Home.css"
import Navbar from '../components/NavBar'
import InfoHome from '../components/InfoHome'
import Profile from '../components/Profile'
import { AvatarSelector, useSharedValue } from '../components/CustomHooks'

function Home({ updateMode, gameMode, updatePlayersInGame  }) {
  const {value, updateValue} = useSharedValue(); /* Hook para mostrar el perfil del usuario */
  const {avatar, modifyAvatarImage, modifyAvatarColor} = AvatarSelector(); /* Hook para permitir el cambio de avatar del usuario */
  const home = true;
  return (
    <div className='Home'>
      <div className='side'>
        <Sidebar inhome={home} updateMode={updateMode} gameMode={gameMode} updatePlayersInGame={() => updatePlayersInGame} />
      </div>
      {value && <div className='profile-home'> {/* Perfil del usuario */}
        <Profile updateValue={updateValue} modifyAvatarImage={modifyAvatarImage} modifyAvatarColor={modifyAvatarColor} /> 
      </div>}
      <div className='cuerpo-home'>
        <div className='appbar'>
          <Navbar updateValue={updateValue} avatar={avatar}/> {/* Modifica el valor del hook para mostrar el perfil */}
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