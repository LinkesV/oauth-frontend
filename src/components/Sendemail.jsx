import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from "@emailjs/browser";
import './styles/Sendemail.css';

function Sendemail() {
  const [email,setEmail] = useState('')
  const navigate = useNavigate()
    const emailHandler = (e)=>{
        e.preventDefault()
        try{
          fetch("https://oauth-backend-hhb3.onrender.com/sendemail", {
              method: "POST", 
              headers: {
                  'Access-Control-Allow-Origin':true,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  email:email,
              })
          })
          .then((res)=>{
              return res.json()
          })
          .then((res)=>{ 
              if(res.email){
    
                // toast.success(`${res.message}`, {
                //   position: toast.POSITION.TOP_RIGHT
                // });
                alert(res.message)

    
                // SEND EMAIL 
    
                emailjs.send(
                  "service_vwt5hn4", //service ID
                  "template_qxyvfa6", //Template ID 
                  {
                    email: res.useremail,
                    username: res.username,
                    message: `
                    Your OTP IS ${res.OTP}
                    Click on this url to proceed: https://mellifluous-sorbet-281589.netlify.app/forgotpsw/${res.id}
                    `
                  },
    
                  "VkDdWcg4J7ipzkxpk" // PUBLIC KEY
                ) 
    
                navigate(`/forgotpsw/${res.id}`)
              }
              else{
                alert(res.message)
                // setTimeout(() => {
                //   toast.success(`${res.message}`, {
                //       position: toast.POSITION.TOP_RIGHT,
                //       toastId: 'otpsent'
                //   });
                // }, 1);
              }
          })
      }
      catch(err){
          console.log(err)
      }
    }
  return (
    <div className='formparent'>
    <div className='sendemailform'>
      <Form>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your email:</Form.Label>
          <Form.Control type="email" placeholder="Enter your registered email" onChange={(e)=>{setEmail(e.target.value)}}  style={{width:"300px"}}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={(e)=>{emailHandler(e)}}  style={{width:"300px"}}>
          Send OTP
        </Button>
    </Form>
    </div>
    </div>
  )
}

export default Sendemail