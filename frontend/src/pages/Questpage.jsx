import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Problembanner from '../components/problembanner'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar_admin from '../components/Navbar_admin';
import Editor from 'react-simple-code-editor';
import {  languages } from 'prismjs/components/prism-core';

function Questpage() {


  const [problem,setProblem] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();
  const [isadmin,setAdmin] = useState(false);

  useEffect(()=>{
    const getProblems= async()=>{
     await axios.get(`http://localhost:5000/problem/getproblem/${id}`,{withCredentials:true})
      .then((res) =>{
        if(res.data==="Unauthorised Request"){
          navigate("/login")
         }
         else{
        setProblem(res.data.problem);
        setAdmin(res.data.isadmin);
        console.log(problem);
         }
      })
      .catch((error)=>{
        
        console.log("er")
      
      })

    }
    getProblems();
  },[])


  const handleDelete=async(id)=>{
    await axios.delete(`http://localhost:5000/problem/delete/${id}`)
    .then((res)=>{
      // if(res.data==="Unauthorised Request"){
      //   navigate("/login")
      //  }
      //  else{
      console.log(res.data)

     
      navigate("/home");
      alert("Problem deleted Successfully")
      //  }
    })
    .catch((error)=>{
      
      console.log("er")
    
    })

  }
    

  const [language,setLang] = useState("cpp");
  const [code, setCode] = useState(`
  // Include the input/output stream library
  #include <iostream> 

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      std::cout << "Hello World!"; 
      
      // Return 0 to indicate successful execution
      return 0; 
  }`);
  // const[code,setCode] = useState();
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    const payload = {
      language,
      code
    };

    // console.log(payload);

    try {
      const { data } = await axios.post('http://localhost:5000/sub/run', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      alert("Syntax error");
    }
  }

  const [correct,setcorrect]=useState(false);
  const[s,ss]=useState(false);
  const [verd,setverd]=useState("Rejected");

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input:String(problem.input)
    };

    //  console.log(payload);

    try {
      const { data } = await axios.post('http://localhost:5000/sub/run/input', payload);
    // console.log(data.output);
      setOutput(data.output);
      ss(true);
      if(data.output===problem.output){
        setcorrect(true);
       
        setverd("Accepted");
        console.log("yo")
      }
    } catch (error) {
      console.log(error);
      alert("Syntax error");
    }
  }

  



  return (
   <>
   {isadmin?(<Navbar_admin/>):( <Navbar/>)
    }
    
       <div className='min-h-screen pt-10'>
        {isadmin?(<div className='adminbuttons mx-10 '>
         <a href={`/editproblem/${problem._id}`}> <button className="btn w-40 text-1xl text-white mx-5 ">Edit</button></a> 
          <button onClick={()=>handleDelete(problem._id)} className="btn w-40 text-1xl text-white hover:bg-red-400 mx-5 ">Delete</button>
        </div>):(<h1></h1>)

        }
   <div className="flex flex-col md:flex-row ml-5 mr-5 text-white">
    <div className='Question md:w-1/2 w-full mt-5' >
    <h1 className='text-3xl mt-5'>{problem.name}</h1>
    <h1 className='mt-5'>Difficulty : {problem.difficulty} </h1>
   <span><h1 className='mt-5'>Time constraint : {problem.timec} </h1></span> 
    
    <p className='mt-5 mb-5 '>{problem.description}</p>
    <h1 className=' text-2xl mb-3'>Tescases:</h1>
    <h1 className='font-bold'>Input:</h1>
    <p>{problem.input}</p>
    <h1 className='font-bold mt-5'>Output</h1>
    <p className='mb-5'>{problem.output}</p>
     </div>
    <div className='code md:w-1/2 w-full mt-5'>
    <select className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 mb-3">
        <option value='cpp' onValueChange={value => setLang(value)} >C++</option>
        {/* <option value='c'>C</option>
        <option value='py'>Python</option>
        <option value='java'>Java</option> */}
      </select>
      
      
      
    <textarea  value={code} onChange={(e) => setCode(e.target.value)}  className=" w-full h-2/3 textarea text-white textarea-bordered" placeholder={code}></textarea>
    <div className='mt-5 min-h-20 border rounded-md border-white'>
    {/* {correct?(<div className='p-3 text-white'>Accepted</div>):(<div></div>)
} */}

{output?(<div className='p-3 text-white'>{output}</div>):(<div></div>)

}
{s?(<div className='p-3 text-white'>Verdict : {verd}</div>):(<div></div>)

}


       {/* {s?(<div className='p-3 text-green-400 '>Accepted</div>):(<div className='p-3 text-red-400'>Wrong</div>)

      } */}

    
     
      
    </div>
    <div className='w-full mt-5'>
    
    <button className="btn w-1/2 " onClick={handleRun}>RUN</button>
    <button className="btn w-1/2" onClick={handleSubmit}>SUBMIT</button>
    </div>
    
    </div>
    </div>
    
   </div>
  
   <Footer/>
   </>
  )
}


export default Questpage