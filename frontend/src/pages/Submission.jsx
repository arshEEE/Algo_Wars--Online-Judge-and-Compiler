import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import Table from '../components/Table';
import { useNavigate } from "react-router-dom";
import Navbar_admin from '../components/Navbar_admin';


function Submission() {

  const[subs,setSubs]=useState([]);
  const navigate = useNavigate();
  const [isadmin,setAdmin] = useState(false);
 
  useEffect(()=>{
    const getSubs= async()=>{
     await axios.get("http://localhost:5000/sub/allsubs",{withCredentials:true})
      .then((res) =>{
        if(res.data==="Unauthorised Request"){
         navigate("/login")
        }
        else{
        setSubs(res.data.submissions);
        setAdmin(res.data.isadmin);
        console.log(res.data.submissions);
        }
      })
      .catch((error)=>{
        console.log(error)
      })

    }
    getSubs();
  },[])


 

  

  return (
    <>
    {isadmin?(<Navbar_admin/>):( <Navbar/>)
    }
   
    <div className='text-2xl text-center my-5 font-bold text-white'>Submissions</div>
    <div className='text-white'>
    <div className="pt-5">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='text-white text-2xl'>
       
        <th >Name</th>
       
        <th>Verdict</th>
      </tr>
    </thead>

   
    <tbody>

    {
        subs.map((p,i)=>(
        
        
        <tr key = {i}  className='hover' >

       <td> <a href={`/getsub/${p._id}`} >{p.problem_name} </a> </td>  
       
        <td> <a href={`/getsub/${p._id}`}>{p.verdict?(<div className="text-green-400">Solved</div>):(<div className='text-Red-400'>Not Solved</div>)}</a> </td>
          
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

export default Submission