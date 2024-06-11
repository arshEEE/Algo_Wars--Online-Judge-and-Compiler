import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useForm  } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar_admin from '../components/Navbar_admin';

function Editprofile() {
  const [user,setUser] = useState('');
  const navigate = useNavigate();
  const[load,SetLoad] =useState(false);
  const [isadmin,setAdmin]=useState(false);



  useEffect(()=>{
    SetLoad(true)
    const getUser= async()=>{
     await axios.get(`http://localhost:5000/user`,{withCredentials:true})
      .then((res) =>{
        if(res.data==="Unauthorised Request"){
          navigate("/login")
         }
         else{
          SetLoad(false);
        setUser(res.data.user);
        setAdmin(res.data.isadmin);
       console.log(user);
         }
        
      })
      .catch((error)=>{
        SetLoad(false);
        console.log(error)
      })

    }
    getUser();

  },[])

  

  const{
    register,
    handleSubmit,
    
    formState:{errors},
  }=useForm();

  const onSubmit = async (data) => {
    const userInfo={
      fullname:data.fullname,
      usertag:data.usertag,
      email:data.email,
      password:data.password,
    }
    await axios.put("http://localhost:5000/user/edit",userInfo,{withCredentials:true})
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        alert("User updated Successfull")
        navigate("/profile")

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
         {isadmin?(<Navbar_admin/>):( <Navbar/>) }
    <div className='items-center justify-center min-h-screen'>
    <h1 className='text-center text-3xl mt-20 mb-10 text-white'>
        Edit Your Profile:
    </h1>

    {load?(<h1 className='text-center text-4xl font-bold text-white min-h-screen'>Your Data is being loaded</h1>):(
       <div className="signup-box border w-[360px] h-[320px] ml-auto mr-auto p-5 border-radius-5 rounded-md ">
   
       <form onSubmit={handleSubmit(onSubmit)}>
         
           <label className='text-white '>Full Name : </label>
           {errors.fullname && <span className='text-red-400'>This field is required.</span>}
          <input type="text"  {...register("fullname",{required:true})} className='w-full px-2 rounded-md bg-white cursor-pointer h-7 text-black click:bold' placeholder={user[0]?.fullname && (`${user[0].fullname}`)}></input>
          <label className='text-white '>User tag : </label>
           {errors.usertag && <span className='text-red-400'>This field is required.</span>}
          <input type="text" {...register("usertag",{required:true})} className='w-full px-2 rounded-md bg-white cursor-pointer h-7 text-black click:bold'  placeholder={user[0]?.fullname && (`${user[0].usertag}`)}></input>
          <label className='text-white '>Email : </label>
           {errors.email && <span className='text-red-400'>This field is required.</span>}
          <input type="email"  {...register("email",{required:true})} className='w-full px-2 rounded-md bg-white cursor-pointer h-7 text-black click:bold' placeholder={user[0]?.fullname && (`${user[0].email}`)}></input>
          <label className='text-white '>Password : </label>
           {errors.password && <span className='text-red-400'>This field is required.</span>}
          <input type="password" {...register("password",{required:true})} className='w-full px-2 rounded-md bg-white cursor-pointer h-7 text-black click:bold-black' placeholder="Password"></input>
   
          <input type="submit" className='bg-white text-black text-2xl  hover:bg-green-500 w-full rounded-md mt-5 h-9 mb-2' value="Update"></input>
   
   
       </form>
   
       </div>
    )






}
   
    </div>
    <Footer/>
    </>
    
     
  )
}

export default Editprofile