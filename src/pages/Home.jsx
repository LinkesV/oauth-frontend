import React from 'react'
import Weight from '../components/Weight'
import Navigation from '../components/Nav.jsx'

function Home() {
  return (
    <div style={{backgroundColor:"wheat", height:"200vh"}}>
      <Navigation/>
      <Weight/>
    </div>
  )
}

export default Home

