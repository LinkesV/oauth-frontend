import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './styles/Oauth.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Oauth() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [psw,setPsw] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    try{
      fetch("http://localhost:4000/normallogin", {
          method: "POST", 
          headers: {
              'Access-Control-Allow-Origin':true,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email:email,
              password:psw,
          })
      })
      .then((res)=>{
          return res.json()
      })
      .then(async (res)=>{ 
          if(res.login){
            navigate(`/${res.id}`)
          }
          else{
            alert(res.message)
          }
      })
  }
  catch(err){
      console.log(err)
  }


  }

  const googleauthHandler = () => {
    window.open("http://localhost:4000/google", "_self")
  }

  const githubauthHandler = () => {
    window.open("http://localhost:4000/github", "_self")
  }

  const facebookauthHandler = () => {
   
    window.open("http://localhost:4000/facebook", "_self")

  }
  

  return (
    <div className='formparent'>
    <div className='formbody' >
      <h5>Weight Tracker Login</h5>
      <Form style={{display:"flex", flexDirection:"column"}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} style={{width:"300px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password"  onChange={(e)=>{setPsw(e.target.value)}}/>
          
          <Link to={'/forgotpsw'}>
            <Form.Text className="text-muted">
              Forgot Password?
            </Form.Text>
          </Link>
          <br></br>
          <Link to={'/signup'}>
            <Form.Text className="text-muted">
              Create an account
            </Form.Text>
          </Link>
        </Form.Group>


        <Button variant="primary" type="submit" onClick={(e)=>{submitHandler(e)}}>
          Login
        </Button>
    </Form>

      <div className='oauthicons'>
         <div className="loginButton google" onClick={googleauthHandler}>
            <img src={'https://img.icons8.com/?size=512&id=17949&format=png'} alt="" className="icon" style={{width:"30px", height:"30px"}}/>
          </div>

          <div className="loginButton github" onClick={githubauthHandler}>
            <img src={'https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png'} alt="" className="icon" style={{width:"30px", height:"30px"}}/>
          </div>

          <div className="loginButton facebook" onClick={facebookauthHandler}>
            <img src={'https://img.icons8.com/?size=512&id=118497&format=png'} alt="" className="icon" style={{width:"30px", height:"30px"}}/>
          </div>
      </div>
    </div>
    </div>
  )
}

export default Oauth