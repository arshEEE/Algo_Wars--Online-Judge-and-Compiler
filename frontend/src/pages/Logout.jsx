import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Logout() {
const[load,SetLoad] = useState(false);
const navigate = useNavigate();
  useEffect(()=>{
    SetLoad(true)
    const logoutUser= async()=>{
     await axios.get(`http://localhost:5000/user/logout`)
      .then((res) =>{
        if(res.data==="Unauthorised Request"){
          navigate("/login")
         }
         else{
        SetLoad(false);
        
       console.log(res.data);
         }
      })
      .catch((error)=>{
        SetLoad(false);
        console.log(error)
      })

    }
    
    logoutUser();

  },[])



  return (
    <div>
        <h1 className=' text-4xl font-bold text-white text-center mt-20 mb-40'>You have sucessfully logged out!!</h1>
       
        <p className='text-2xl text-center text-white ml-auto mr-auto'> <span className='text-blue-400 cursor-pointer'><a href='/'>  Log in</a></span> again to continue solving questions!!</p>
        
        <h1 className='text-center mt-40 text-5xl text-green-500 font-bold'>_Code_wars</h1>
       
    </div>
  )
}

export default Logout