import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { addweight, deleteweight, setcalorie, setfirstname, setid, setpfp, sortweight} from '../store/userSlice'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import { setweight } from '../store/userSlice'
import Table from 'react-bootstrap/Table';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, LineElement} from 'chart.js/auto';
import './styles/Weight.css';

ChartJS.register(
  LineElement
)
function Weight() {
    const [date,setDate] = useState('')
    const [weight,setWeight] = useState('')

     const id = useParams().id
     const navigate = useNavigate()
     const dispatch = useDispatch()
     
     const weighttracker = useSelector((state)=>{return state.weighttracker})
    useEffect(()=>{
        try{
            fetch(`https://oauth-backend-hhb3.onrender.com/login/success/${id}`, {
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
        else{
            dispatch(
               setfirstname({
                firstname:res.user.fname
               })
            )

            dispatch(
              setpfp({
               pfp:res.user.pfp
              })
            )

            dispatch(
              setid({
              id:res.user._id
              })
            )

            dispatch(
              setweight({
                weighttracker:res.user.weighttracker
             })
            )

            dispatch(
              setcalorie({
                calorietracker:res.user.calorietracker
             })
            )
        }
      })
        }
        catch(err){
            console.log(err)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const addHandler = async (e) =>{
      e.preventDefault()
     if(weight.length === 0 || date.length === 0){
      alert('Fill in all fields of the table')
     }
     else{
      let x = {date:date,weight:weight}
      let y = [...weighttracker, x].sort(function(a,b){
        return new Date(a.date)- new Date(b.date);
      })

       dispatch(
        addweight({weighttracker:x})
      )
       dispatch(
        sortweight()
      )
      try{
        await fetch("https://oauth-backend-hhb3.onrender.com/updateweight", {
           method: "POST", 
           headers: {
               'Access-Control-Allow-Origin':true,
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               weighttracker:y,
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

    const deleteHandler = async (e, value) =>{
      e.preventDefault()
      let x = weighttracker.filter((item,index)=>{
        return index.toString() !== value
    })
      await dispatch(
         deleteweight({index:value})
      )

      try{
        await fetch("https://oauth-backend-hhb3.onrender.com/updateweight", {
           method: "POST", 
           headers: {
               'Access-Control-Allow-Origin':true,
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({
               weighttracker:x,
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

   

    const [chartData,setChartdata] = useState({
      labels: weighttracker.map((item)=> item.date),
      datasets: [{
        label:"Weight",
        data: weighttracker.map((item)=>{return item.weight}),
      }]
     })

     useEffect(()=>{
      // UPDATE DB (IF ELSE TO PREVENT THIS FROM RUNNING DURING LOGOUT)
      setChartdata({
        labels: weighttracker.map((item)=> item.date.split('-').reverse().join('-')),
        datasets: [{
          label:"Weight(kg)",
          data: weighttracker.map((item)=>{return item.weight}),
        }]
       })
     },[weighttracker])




  return (
    <div className='bckgrd'>
      <div>
        <h1>Weight Tracker</h1>
        <p>This is an application that will help you to keep track of your weight loss to help you stay motivated and continue working out. Visible representation of weight loss will be shown in a graph</p>
        <br></br>
        <br></br>

        <p>Enter the date and your weight on that specific date in the form below:</p>
      </div>

      <Form style={{marginBottom:"100px"}}>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" placeholder="Enter date" onChange={(e)=>{setDate(e.target.value)}}  style={{width:"300px"}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicWeight">
          <Form.Label>Weight:</Form.Label>
          <Form.Control type="number" placeholder="Enter your weight in kilograms"  onChange={(e)=>{setWeight(e.target.value)}}/>
        </Form.Group>


        <Button variant="primary" type="submit" onClick={(e)=>{addHandler(e)}}  style={{width:"300px"}}>
          Add data to chart
        </Button>
    </Form>
    <div style={{width:"50vw"}}>
        <Line data={chartData}/>
    </div>  
    <h5 style={{marginTop:"100px", textAlign:"center", textDecoration:"underline"}}>Weight Tracker Table</h5>
    <div>
    <Table striped bordered hover style={{width:"75vw",marginTop:"10px", textAlign:"center"}}>
      <thead>
        <tr>
          <th>#</th>
          <th>Weight(kg)</th>
          <th>Date</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {weighttracker.map((item,index)=>{
          return(
            <tr key={index}>
              <td>{index}</td>
              <td>{item.weight}</td>

              <td>{item.date.split('-').reverse().join('-')}</td>
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

export default Weight