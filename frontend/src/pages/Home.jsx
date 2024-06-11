import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import Table from '../components/Table';
import { useNavigate } from "react-router-dom";
import Navbar_admin from '../components/Navbar_admin';


function Home() {

  const[problem,setProblem]=useState([]);
  const navigate = useNavigate();
  const [isadmin,setAdmin] = useState(false);
 
  useEffect(()=>{
    const getProblems= async()=>{
     await axios.get("http://localhost:5000/problem",{withCredentials:true})
      .then((res) =>{
        if(res.data==="Unauthorised Request"){
         navigate("/login")
        }
        else{
        setProblem(res.data.problems);
        setAdmin(res.data.isadmin);
        console.log(problem);
        }
      })
      .catch((error)=>{
        console.log(error)
      })

    }
    getProblems();
  },[])


 

  

  return (
    <>
    {isadmin?(<Navbar_admin/>):( <Navbar/>)
    }
   
    <div className='text-2xl text-center my-5 font-bold text-white'>Problems</div>
    <div className='text-white'>
    <div className="pt-5">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='text-white text-2xl'>
       
        <th >Name</th>
       
        <th>Level</th>
      </tr>
    </thead>

   
    <tbody>

    {
        problem.map((p,i)=>(
        
        
        <tr key = {i}  className='hover' >

       <td> <a href={`/getproblem/${p._id}`} >{p.name} </a> </td>  
       
        <td> <a href={`/getproblem/${p._id}`}>{p.difficulty}</a> </td>
          
        </tr>
       
        ))
      }
    
    </tbody>
  </table>
   </div>
    </div>
   
    <div className='min-h-screen'></div>
    <Footer/>
    </>
    
  )
}

export default Home