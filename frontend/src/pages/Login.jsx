import React from 'react'
import {useForm} from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const{
    register,
    handleSubmit,
    
    formState:{errors},
  }=useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const userInfo={
     
      email:data.email,
      password:data.password,
    }
    await axios.post("http://localhost:5000/user/login",userInfo,{withCredentials:true})
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        alert("Log-In Successfull")
        navigate("/home")
      }

    }).catch((err)=>{
     if(err.response){
      console.log(err.response.data);
      alert("Error: "+err.response.data.message)
     }
    })
  }
  
  return (
    <>
    <div className='items-center justify-center'>
    <h1 className='text-center text-5xl mt-20 mb-10 text-green-500'>
        _Code_wars
    </h1>
    <div className="signup-box border w-[360px] h-[370px] ml-auto mr-auto p-5 border-radius-5 rounded-md ">
   
    <h2 className='text-center font-bold text-2xl text-white mt-6 mb-3'>Log-In</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
       
       <label className='text-white '>Email : </label>
       {errors.email && <span className='text-red-400'>This field is required.</span>}
       <input type="email" {...register("email",{required:true})} className='w-full px-2 rounded-md mb-4 bg-white cursor-pointer h-8 text-black click:bold' placeholder=""></input>
     
       <label className='text-white '>Password : </label>
       {errors.password && <span className='text-red-400'>This field is required.</span>}

       <input type="password" {...register("password",{required:true})}  className='w-full px-2 rounded-md mb-4 bg-white cursor-pointer h-8 text-black click:bold-black' placeholder=""></input>

       <input type="submit" className='bg-white text-black text-2xl  hover:bg-green-500 w-full rounded-md mt-5 h-9 mb-2' value="Submit"></input>


    </form>

    <p className='text-white'>New to _Code-wars? <a className="text-blue-400 " href='/register'>Sign-Up</a></p>
    </div>
    </div>
    </>
    
  )
}

export default Login