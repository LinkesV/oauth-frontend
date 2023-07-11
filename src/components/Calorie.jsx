import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useState } from 'react';
import { addcalorie, deletecalorie, sortcalorie } from '../store/userSlice';
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import Table from 'react-bootstrap/Table';
import './styles/Calorie.css'


function Calorie() {
    const id = useParams().id
    const dispatch = useDispatch()
    const calorietracker = useSelector((state)=>{return state.calorietracker})


    const [date,setDate] = useState('')
    const [weight,setWeight] = useState('')
    const [intake,setIntake] = useState()
    const [burnt,setBurnt] = useState()

   

    const addHandler = async (e) => { 
        e.preventDefault()
        if(date.length === 0 || weight.length === 0 || intake.length === 0 || burnt.length === 0){
          alert('Please fill in all fields of the form')
        }
        else{
          let  deficit = ((burnt - intake)/burnt)*100
        let y = {
            date:date,
            weight:weight,
            calorieIntake:intake,
            calorieBurnt:burnt,
            calorieDeficit:deficit
        }
        let x = [...calorietracker, y].sort(function(a,b){
            return new Date(a.date)- new Date(b.date);
          })

        await dispatch(
             addcalorie({calorietracker: y})
        )

        await dispatch(
             sortcalorie()
        )

       
        try{
            await fetch("https://oauth-backend-hhb3.onrender.com/updatecalorie", {
               method: "POST", 
               headers: {
                   'Access-Control-Allow-Origin':true,
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   calorietracker:x,
                   id:id,
               })
           })
           .then((res)=>{
               return res.json()
           })
           .then(async (res)=>{ 
             alert(res.message)
           })
       }
       catch(err){
           console.log(err)
       }
        }
       

    }

    const deleteHandler = async (e,value) => {
        e.preventDefault()
        let y = calorietracker.filter((item,index)=>{
            return index.toString() !== value
        })

        await dispatch(
            deletecalorie({index: value})
        )
        try{
            await fetch("https://oauth-backend-hhb3.onrender.com/updatecalorie", {
               method: "POST", 
               headers: {
                   'Access-Control-Allow-Origin':true,
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   calorietracker:y,
                   id:id,
               })
           })
           .then((res)=>{
               return res.json()
           })
           .then(async (res)=>{ 
             alert(res.message)
           })
       }
       catch(err){
           console.log(err)
       }
       
    }

   

  return (
    <div className='bckgrdcalorie'>
        <div>
            <h1>Calorie Tracker</h1>
            <p>An application that will keep track of your calorie deficiet. To lose weight, you must be in a calorie deficit (calories burnt is greater than calorie intake). 
            An ideal calorie deficit will be around <strong>10–20%.</strong> This will be included in the table below for ease of viewing</p>

            <p>Enter the date, your weight, your calorie intake and calories burnt on that specific date in the form below:</p>
        </div>

        <Form style={{width:"500px"}}>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder="Enter date" onChange={(e)=>{setDate(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicWeight">
          <Form.Label>Weight</Form.Label>
          <Form.Control type="number" placeholder="Enter your weight in kilograms"  onChange={(e)=>{setWeight(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCalorieIntake">
          <Form.Label>Calorie Intake</Form.Label>
          <Form.Control type="number" placeholder="Enter your calorie intake for the day"  onChange={(e)=>{setIntake(parseInt(e.target.value))}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCalorieBurnt">
          <Form.Label>Calories Burnt</Form.Label>
          <Form.Control type="number" placeholder="Enter your calorie burnt for the day (excercise + resting energy burnt)"  onChange={(e)=>{setBurnt(parseInt(e.target.value))}}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={(e)=>{addHandler(e)}}>
          Add
        </Button>
    </Form>

    <h5 style={{marginTop:"100px", textAlign:"center", textDecoration:"underline"}}>Calorie Tracker Table</h5>

    <div>
    <Table striped bordered hover style={{width:"75vw",marginTop:"100px", textAlign:"center"}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Weight(kg)</th>
          <th>Calorie Intake(kcal)</th>
          <th>Calories Burnt(kcal)</th>
          <th>Calorie Deficit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {calorietracker.map((item,index)=>{
          return(
            <tr key={index}>
              <td>{index}</td>
              <td>{item.date.split('-').reverse().join('-')}</td>
              <td>{item.weight}</td>
              <td>{item.calorieIntake}</td>
              <td>{item.calorieBurnt}</td>
              <td>{item.calorieDeficit}%</td>
              <td><button value={index} onClick={(e)=>{deleteHandler(e,e.target.value)}} className='delbtn'>Delete</button></td>
        </tr>
          )
        })}
      </tbody>
    </Table>
    </div>
    </div>
  )
}

export default Calorie