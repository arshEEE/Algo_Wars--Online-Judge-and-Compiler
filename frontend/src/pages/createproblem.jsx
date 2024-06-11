import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Navbar_admin from '../components/Navbar_admin';


function CreateProblem() {
  const{
    register,
    handleSubmit,
    
    formState:{errors},
  }=useForm();
  const navigate = useNavigate();

//   const [isadmin , setAdmin]=useState(false);

  const onSubmit = async (data) => {
    const probInfo={
      name:data.name,
      description:data.description,
      difficulty:data.difficulty,
      input:data.input,
      output:data.output,
      timec:data.timec,
    }
    await axios.post("http://localhost:5000/problem/create",probInfo,{withCredentials:true})
    .then((res)=>{
    //   console.log(res.data)
      if(res.data){
        alert("Problem Added Successfully")

          navigate(`/getproblem/${res.data.problem._id}`)
          console.log(res.data.problem._id)
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
    <Navbar_admin/>
    
    <div className='items-center justify-center'>
    <h1 className='  mx-5 text-3xl mt-10  text-white'>
      Add:
    </h1>
    <div className="signup-box   items-center w-2/3  ml-auto mr-auto p-5 border-radius-5 rounded-md ">
   
    <form onSubmit={handleSubmit(onSubmit)}>
        <label className='text-white '>Name : </label>
        {errors.name && <span className='text-red-400'>This field is required.</span>}
       <input type="text"  {...register("name",{required:true})} className='w-full px-2  rounded-md bg-white cursor-pointer h-7 text-black click:bold' placeholder=""></input>
       
       <label className='text-white '>Difficulty : </label>
        {errors.difficulty && <span className='text-red-400'>This field is required.</span>}
       <input type="text"  {...register("difficulty",{required:true})} className='w-full px-2 rounded-md bg-white cursor-pointer h-7 text-black click:bold' placeholder=""></input>
       
       
      
       <label className='text-white '>Time constraint (In seconds) : </label>
        {errors.timec && <span className='text-red-400'>This field is required.</span>}
       <input type="number" {...register("timec",{required:true})} className='w-full px-2 rounded-md bg-white cursor-pointer h-7 text-black click:bold-black' placeholder=""></input>
       
       <label className='text-white '>Description: </label>
        {errors.description && <span className='text-red-400'>This field is required.</span>}
        <textarea type="text" {...register("description",{required:true})} className=" w-full h-1/2 bg-white textarea textarea-bordered text-black click:bold" ></textarea>
         <h1 className='text-white mt-5 text-2xl'>Test cases :</h1>
        <label className='text-white '>Input: </label>
        <textarea type="text" {...register("input",{required:true})} className=" w-full h-1/2 bg-white textarea textarea-bordered text-black click:bold" ></textarea>

        <label className='text-white '>Output: </label>
        <textarea type="text" {...register("output",{required:true})} className=" w-full h-1/2 bg-white textarea textarea-bordered text-black click:bold" ></textarea>

       <input type="submit" className='bg-white text-black text-2xl  hover:bg-green-500 w-full rounded-md mt-5 h-9 mb-2' value="Submit"></input>


    </form>

    </div>
    </div>
    <Footer/>
    </>
    
     
  )
}

export default CreateProblem