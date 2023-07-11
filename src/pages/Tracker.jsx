import React from 'react'
import Navigation from '../components/Nav'
import Calorie from '../components/Calorie'

function Tracker() {
  return (
    <div style={{backgroundColor:"wheat"}}>
        <Navigation/>
        <Calorie/>
    </div>
  )
}

export default Tracker