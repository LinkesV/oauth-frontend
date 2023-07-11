import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import './styles/Otp.css'
function Otp() {
  const [otp, setOtp] = useState('')
  const id = useParams().id
  const navigate = useNavigate('')

  const otpHandler = (e)=>{
    e.preventDefault()
    try{
      fetch("https://oauth-backend-hhb3.onrender.com/checkotp", {
          method: "POST", 
          headers: {
              'Access-Control-Allow-Origin':true,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id:id,
              otp:otp,
          })
      })
      .then((res)=>{
          return res.json()
      })
      .then((res)=>{ 
          if(res.result){
            navigate(`/resetpsw/${id}`)
            alert(res.message)
            // setTimeout(() => {
            //   toast.success(`${res.message}`, {
            //       position: toast.POSITION.TOP_RIGHT
            //   });
            // }, 1);
          }
          else{
            alert(res.message)

          //   toast.success(`${res.message}`, {
          //     position: toast.POSITION.TOP_RIGHT
          // });
          }
      })
  }
  catch(err){
      console.log(err)
  }
  } 
  return (
    <div className='formparent'>
    <div className='otpform'>
      <Form>

        <Form.Group className="mb-3" controlId="formBasicOTP">
          <Form.Label>Enter your OTP:</Form.Label>
          <Form.Control type="text" placeholder="Enter your OTP" onChange={(e)=>{setOtp(e.target.value)}} style={{width:"300px"}}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={(e)=>{otpHandler(e)}} style={{width:"300px"}}>
          Check OTP
        </Button>
    </Form>
    </div>
    </div>
  )
}

export default Otp