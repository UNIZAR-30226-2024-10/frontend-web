import React from 'react'
import Sidebar from '../components/SideBar'
import "../styles/Home.css"
import Navbar from '../components/NavBar'

function Home() {
  return (
    <div className='Home'>
      <div className='side'>
        <Sidebar />
      </div>
      <div className='appbar'>
        <Navbar/>
      </div>
    </div>
  )
}

export default Home