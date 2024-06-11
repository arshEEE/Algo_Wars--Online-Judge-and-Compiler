import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Problembanner from '../components/problembanner'
import axios from 'axios'
import Footer from '../components/Footer'
import { useParams } from "react-router-dom";


function Problem() {

  const [problem,setProblem] = useState('');
  const {id} = useParams();

  useEffect(()=>{
    const getProblems= async()=>{
     await axios.get("http://localhost:5000/problem",{withCredentials:true})
      .then((res) =>{
        if(res.data==="Unauthorised Request"){
          navigate("/login")
         }
         else{
        setProblem(res.data.problems);
        console.log(problem);
         }
      })
      .catch((error)=>{
        console.log("hello")
      })

    }
    getProblems();
  })

    
   return (
    <>
    <Navbar/>
    <Problembanner/>
    <Footer/>
    </>
  )
}

export default Problem