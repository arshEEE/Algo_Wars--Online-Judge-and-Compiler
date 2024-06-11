import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar_admin from '../components/Navbar_admin';
import Navbar from '../components/Navbar';

function Subpage() {
    const [submission,setSub] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();
  const [isadmin,setAdmin] = useState(false);

  useEffect(()=>{
    const getSubmission= async()=>{
     await axios.get(`http://localhost:5000/sub/getsub/${id}`,{withCredentials:true})
      .then((res) =>{
        if(res.data==="Unauthorised Request"){
          navigate("/login")
         }
         else{
        setSub(res.data.submission);
        setAdmin(res.data.isadmin);
        // console.log(res.data.submission)
        
         }
      })
      .catch((error)=>{
        
        console.log("er")
      
      })

    }
    getSubmission();
  },[])


  return (
    <>
    {isadmin?(<Navbar_admin/>):( <Navbar/>)
    }
    <div>
    <h1 className='text-white text-3xl my-5 mx-5'>Problem Name :{submission.problem_name}</h1>
    <h1 className='text-white text-3xl my-5 mx-5'>Verdict :{submission.verdict?(<span className='text-green-400'>Solved</span>):(<span text-red-400>Not Solved</span>)}</h1>
    <h1 className='text-white text-3xl my-5 mx-5'>Code:</h1>
    <div className='text-white text-2xl  my-5 mx-5 min-h-1/2'>{submission.code}</div>

    </div>
   
    
    </>
    




  )
}

export default Subpage