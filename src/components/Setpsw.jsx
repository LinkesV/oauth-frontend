import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './styles/Setpsw.css'
function Setpsw() {
  const [psw, setPsw] = useState('')
  const [cfmpsw, setCfmpsw] = useState('')
  const navigate = useNavigate()
  const id = useParams().id

  const pswHandler = (e)=>{
    e.preventDefault()
    if(psw === cfmpsw){
      try{
        fetch("https://oauth-backend-hhb3.onrender.com/changepsw", {
            method: "POST", 
            headers: {
                'Access-Control-Allow-Origin':true,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:id,
                password:psw,
            })
        })
        .then((res)=>{
            return res.json()
        })
        .then((res)=>{ 
            alert(res.message)
            navigate('/')
        })
    }
    catch(err){
        console.log(err)
    }
    }
    else{
      alert('Passwords do not match')
    }

  }
  return (
    <div className='formparent'>
    <div className='pswform'>

      <Form>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter your new password:</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" onChange={(e)=>{setPsw(e.target.value)}} style={{width:"300px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCfmpassword">
          <Form.Label>Confirm your new password:</Form.Label>
          <Form.Control type="password" placeholder="Reenter your new password" onChange={(e)=>{setCfmpsw(e.target.value)}}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={(e)=>{pswHandler(e)}} style={{width:"300px"}}>
          Change Password
        </Button>
    </Form>
    </div>
    </div>
  )
}

export default Setpsw