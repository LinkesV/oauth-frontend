import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { clearuser } from '../store/userSlice';

function Navigation() {
  const user = useSelector((state)=>{return state})
  const dispatch = useDispatch()
  const logoutHandler = ()=>{
    window.open("http://localhost:4000/logout","_self");
    dispatch(
      clearuser()
    )
  }
  return (
    <>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container style={{marginLeft:"30px"}}>
        <Navbar.Brand href={`/${user.id}`} style={{marginRight:"1000px"}}>Weight Loss Helper</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href={`/${user.id}`} style={{width:"200px", justifyContent:"center", display:"flex"}}>Home</Nav.Link>
          <Nav.Link href={`/${user.id}/tracker`} style={{width:"200px", justifyContent:"center", display:"flex"}}>Calorie Tracker</Nav.Link>
        </Nav>
        <div style={{display:"flex", marginLeft:"30px", paddingLeft:"40px", paddingRight:"40px"}}>
          <img src={user.pfp} alt="404" style={{height:"30px", width:"30px",borderRadius:"50%" }}></img>
          <button onClick={logoutHandler} style={{marginLeft:"10px"}}>LogOut</button>
        </div>
      </Container>
    </Navbar>
  </>
  )
}

export default Navigation