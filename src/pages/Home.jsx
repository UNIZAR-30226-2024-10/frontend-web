import React from 'react'
import Sidebar from '../components/SideBar'
import "../styles/Home.css"
import Navbar from '../components/NavBar'
import InfoHome from '../components/InfoHome'
import Profile from '../components/Profile'
import { AvatarSelector, useSharedValue } from '../components/CustomHooks'

function Home({ updateMode }) {
  const {value, updateValue} = useSharedValue(); /* Hook para mostrar el perfil del usuario */
  const {avatar, modifyAvatar} = AvatarSelector(); /* Hook para permitir el cambio de avatar del usuario */
  const home = false;
  return (
    <div className='Home'>
      <div className='side'>
        <Sidebar ingame={home} updateMode={updateMode} />
      </div>
      <div className='cuerpo-home'>
        <div className='appbar'>
          <Navbar updateValue={updateValue} avatar={avatar}/> {/* Modifica el valor del hook para mostrar el perfil */}
        </div>
        <div className='middle'>
            {/*value && <div className='profile-home'> {/* Perfil del usuario }
              <Profile updateValue={updateValue} modifyAvatar={modifyAvatar} /> 
             </div>*/}
            <div className='middle-recuadros'>
              <InfoHome />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home