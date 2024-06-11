import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function EditProblem() {
    const [prob,setprob] = useState('');
    const navigate = useNavigate();
    const[load,SetLoad] =useState(false);
    const {id} = useParams();
  
  
    useEffect(()=>{
      SetLoad(true)
      const getProb= async()=>{
       await axios.get(`http://localhost:5000/problem/getproblem/${id}`,{withCredentials:true})
        .then((res) =>{
          if(res.data==="Unauthorised Request"){
            navigate("/login")
           }
           else{
            SetLoad(false);
          setprob(res.data.problem);
         console.log(res.data);
           }
          
        })
        .catch((error)=>{
          SetLoad(false);
          console.log(error)
        })
  
      }
      getProb();
  
    },[])
  
    


  const{
    register,
    handleSubmit,
    
    formState:{errors},
  }=useForm();
  

  const onSubmit = async (data) => {
    const probInfo={
      name:data.name,
      description:data.description,
      difficulty:data.difficulty,
      input:data.input,
      output:data.output,
      timec:data.timec,
    }
    await axios.put(`http://localhost:5000/problem/update/${id}`,probInfo,{withCredentials:true})
    .then((res)=>{
    //   console.log(res.data)
      if(res.data){
        alert("Problem Edited Successfully")
          navigate(`/getproblem/${res.data.problem._id}`)
        //   console.log(res.data.problem._id)
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
    <Navbar/>
    <div className='items-center justify-center'>
    <h1 className='  mx-5 text-3xl mt-10  text-white'>
      Add:
    </h1>
    <div className="signup-box   items-center w-2/3  ml-auto mr-auto p-5 border-radius-5 rounded-md ">
   
    <form onSubmit={handleSubmit(onSubmit)}>
        <label className='text-white '>Name : </label>
        {errors.name && <span className='text-red-400'>This field is required.</span>}
       <input type="text"  {...register("name",{required:true})} className='w-full px-2  rounded-md bg-white cursor-pointer h-7 text-black click:bold' placeholder={prob?.name && (`${prob.name}`)}></input>
       
       <label className='text-white '>Difficulty : </label>
        {errors.difficulty && <span className='text-red-400'>This field is required.</span>}
       <input type="text"  {...register("difficulty",{required:true})} className='w-full px-2 rounded-md bg-white cursor-pointer h-7 text-black click:bold' placeholder={prob?.difficulty && (`${prob.difficulty}`)}></input>
       
       
      
       <label className='text-white '>Time constraint (In seconds) : </label>
        {errors.timec && <span className='text-red-400'>This field is required.</span>}
       <input type="number" {...register("timec",{required:true})} className='w-full px-2 rounded-md bg-white cursor-pointer h-7 text-black click:bold-black' placeholder={prob?.timec && (`${prob.timec}`)}></input>
       
       <label className='text-white '>Description: </label>
        {errors.description && <span className='text-red-400'>This field is required.</span>}
        <textarea type="text" {...register("description",{required:true})} className=" w-full h-1/2 bg-white textarea textarea-bordered text-black click:bold" placeholder={prob?.description && (`${prob.description}`)}></textarea>
         <h1 className='text-white mt-5 text-2xl'>Test cases :</h1>
        <label className='text-white '>Input: </label>
        <textarea type="text" {...register("input",{required:true})} className=" w-full h-1/2 bg-white textarea textarea-bordered text-black click:bold" placeholder={prob?.input && (`${prob.input}`)}></textarea>

        <label className='text-white '>Output: </label>
        <textarea type="text" {...register("output",{required:true})} className=" w-full h-1/2 bg-white textarea textarea-bordered text-black click:bold" placeholder={prob?.output && (`${prob.output}`)} ></textarea>

       <input type="submit" className='bg-white text-black text-2xl  hover:bg-green-500 w-full rounded-md mt-5 h-9 mb-2' value="Submit"></input>


    </form>

    </div>
    </div>
    <Footer/>
    </>
    
     
  )
}

export default EditProblem