import React from 'react'
import Sidebar from '../components/SideBar'
import "../styles/Home.css"
import Navbar from '../components/NavBar'
import ModesInfo from '../components/ModesInfo'

function Home() {
  return (
    <div className='Home'>
      <div className='side'>
        <Sidebar />
      </div>
      <div className='appbar'>
        <Navbar/>
        <div className='info'>
          <div className='info-recuadros'>
            <ModesInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home