import React from 'react'
import Sidebar from '../components/SideBar'
import "../styles/Home.css"
import Navbar from '../components/NavBar'
import InfoHome from '../components/InfoHome'
import Profile from '../components/Profile'
import useSharedValue from '../components/useModifiableValue'
import AvatarSelector from '../components/AvatarSelector'

function Home() {
  const {value, updateValue} = useSharedValue(); /* Hook compartido por módulos */
  const {avatar, modifyAvatar} = AvatarSelector();
  return (
    <div className='Home'>
      <div className='side'>
        <Sidebar />
      </div>
      <div className='appbar'>
        <Navbar updateValue={updateValue} avatar={avatar}/> {/* Modifica el valor del hook para mostrar el perfil */}
        <div className='middle'>
          {value && <div className='profile-home'> {/* Perfil del usuario*/}
            <Profile updateValue={updateValue} modifyAvatar={modifyAvatar} /> 
          </div>}
          <div className='middle-recuadros'>
            <InfoHome />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home