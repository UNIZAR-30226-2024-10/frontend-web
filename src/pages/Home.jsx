import React from 'react'
import ResponsiveAppBar from '../components/NavBar'
import Sidebar from '../components/SideBar'
import "../styles/Home.css"

function Home() {
  return (
    <div className='Home'>
      <div className='side'>
        <Sidebar />
      </div>
      <div className='appbar'>
        <ResponsiveAppBar/>
      </div>
    </div>
  )
}

export default Home