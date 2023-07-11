import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Newuser.css'
function Newuser() {

  const [email,setEmail] = useState('')
  const [psw,setPsw] = useState('')
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [url,setUrl] = useState('')
  const navigate = useNavigate()
  const pswchecker =  new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
  let result = true;


  const signupHandler = (e) => {
    e.preventDefault()
    try{
      if(fname.length === 0 || lname.length === 0 || url.length === 0){
        alert("Please fill in all the fields to create an account")
        result = false
      }
      if(!/\S+@\S+\.\S+/.test(email)){
        alert("Please enter a valid email")
        result = false

      }
      if(!pswchecker.test(psw)){
        alert("Password must have minimum eight characters, at least one captial letter,at least one captial letter, one number and one special character:")
        result = false
      }
     if(result){
      fetch("https://oauth-backend-hhb3.onrender.com/createuser", {
        method: "POST", 
        headers: {
            'Access-Control-Allow-Origin':true,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fname:fname,
            lname:lname,
            email:email,
            password:psw,
            url:url
        })
    })
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{ 
        if(res.message !== undefined){
            
            navigate('/')
            alert(res.message)
            // setTimeout(() => {
            //     toast.success(`${res.message}`, {
            //         position: toast.POSITION.TOP_RIGHT,
            //         toastId: 'signupSuccess'
            //     });
            //   }, 1);
        }
    })
     }
  }
  catch(err){
      console.log(err)
  }
  }

  return (
    <div className='formparent'>
    <div  className='signupform'>
      <h5>Weight Loss Tracker Sign Up Page</h5>
      <Form>

        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter your first name" onChange={(e)=>{setFname(e.target.value)}} style={{width:"300px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" placeholder="Enter your last name" onChange={(e)=>{setLname(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicProfilepicture">
          <Form.Label>Profile Picture:</Form.Label>
          <Form.Control type="text" placeholder="Enter url of preffered profile picture" onChange={(e)=>{setUrl(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password"  onChange={(e)=>{setPsw(e.target.value)}}/>
        </Form.Group>


        <Button variant="primary" type="submit" onClick={(e)=>{signupHandler(e)}} style={{width:"300px"}}>
          Sign Up
        </Button>
    </Form>
    </div>
    </div>
  )
}

export default Newuser