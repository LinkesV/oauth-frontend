import React from 'react'
import Navigation from '../components/Nav'
import Calorie from '../components/Calorie'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Tracker() {
    const id = useParams().id
     const navigate = useNavigate()
  useEffect(()=>{
    try{
        fetch(`http://localhost:4000/login/success/${id}`, {
            method: "GET", 
            headers: {
            'Access-Control-Allow-Origin':true,
            'Content-Type': 'application/json',
            },
  })
  .then((res)=>{
    return res.json()
  })
  .then((res)=>{
    if(!res.login){
        navigate('/')
    }
  })
    }
    catch(err){
        console.log(err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  return (
    <div style={{backgroundColor:"wheat"}}>
        <Navigation/>
        <Calorie/>
    </div>
  )
}

export default Tracker