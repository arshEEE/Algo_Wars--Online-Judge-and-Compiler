import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Navbar_admin from '../components/Navbar_admin';

function Profile() {
  const [user,setUser] = useState('');
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
      
         }
      })
      .catch((error)=>{
        SetLoad(false);
        console.log(error)
      })

    }
    getUser();

  },[])



  



  
  // {profile?.name && (<p className="details">
  //   {JSON.stringify(profile.name)}
  //   </p>)}


  return (
    <>
     {isadmin?(<Navbar_admin/>):( <Navbar/>) }
    
     
     <div className='min-h-screen text-2xl my-10 text-center text-white '>
      <h1 className='text-3xl font-bold mb-6'>Profile</h1>
      <hr className='w-2/3 mx-auto'></hr>
      {load?(<h1>Your Data is being loaded</h1>):(
        <div className='credentials my-6'>
        <ul >
          <li className=' border h-10 w-2/3 mx-auto'>
          <label>Full_Name:</label> {user[0]?.fullname && (<span className='font-bold text-green-500'> {JSON.stringify(user[0].fullname)}</span>)}
          {/* <span className='font-bold text-green-500'>{ `${load}`}</span> */}
          </li>
          <li className=' border h-10 w-2/3 mx-auto'>
          <label>User_tag:</label> {user[0]?.usertag && (<span className='font-bold text-green-500'> {JSON.stringify(user[0].usertag)}</span>)}
          </li>
          <li className=' border  h-10 w-2/3 mx-auto'>
          <label>Email:</label> {user[0]?.email && (<span className='font-bold text-green-500'> {JSON.stringify(user[0].email)}</span>)}
          </li>
          <li>
            <h1 className='mt-7'>Edit profile :</h1>
          <a href='/profile/edit'>
          <input type="submit"  className='bg-white text-black text-2xl  hover:bg-green-500 w-1/3 rounded-md mt-2 h-9 mb-2' value="Edit"></input> 
            </a>

           </li>
         


        </ul>
      </div>

      )
      }
      
     </div>
     <Footer/>
    </>
   
  )


}

export default Profile