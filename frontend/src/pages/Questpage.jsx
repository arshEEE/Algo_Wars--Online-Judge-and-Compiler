
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar_admin from '../components/Navbar_admin';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // Use a more visually appealing theme
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function Questpage() {
  const [problem, setProblem] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [language, setLang] = useState('cpp');
  const [code, setCode] = useState(`#include <iostream>\n\nint main() {\n  std::cout << "Hello, World!";\n  return 0;\n}`);
  const [output, setOutput] = useState('');
  const [correct, setCorrect] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [customOutput, setCustomOutput] = useState('');
  const [inpdisp,setinpdisp]=useState(false);
  const [outdisp,setoutdisp]=useState(true);
  const [verddisp,setverddisp]=useState(false);
  const [testDis,setTestDis]  = useState([{}])
  const [complete,setcomp]=useState(false)
  const [profilePicture, setProfilePicture] = useState('');

  let comp=false;
  // const[ maxtime,stmaxtime]=useState(0)
  // const[ maxmem,stmaxmem]=useState(0)
  let maxtime=0;
  let maxmem=0;
  let inps=[];
  let outs=[];



  const [user,setuser]=useState("")
  const handleOutput = ()=>{
    setoutdisp(true)
    setinpdisp(false)
    setverddisp(false)
}

const handleInput = ()=>{
  setoutdisp(false)
  setinpdisp(true)
  setverddisp(false)
}

const handleVerdict = ()=>{
  setoutdisp(false)
  setinpdisp(false)
  setverddisp(true)
}

useEffect(() => {
  //setLoad(true);
  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/user', { withCredentials: true });
      if (res.data === "Unauthorised Request") {
        navigate("/login");
      } else {
       
       
        setProfilePicture(res.data.user[0].profilePicture || '');
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
    }
  };
  getUser();
  console.log(user,profilePicture)
}, []);









  useEffect(() => {
    const getProblems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/problem/getproblem/${id}`, { withCredentials: true });
        if (res.data === 'Unauthorised Request') {
          navigate('/');
        } else {
          setProblem(res.data.problem);
          setIsAdmin(res.data.isadmin);
          setuser(res.data.userid);
        }
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };
    getProblems();
  }, [id, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/problem/delete/${id}`);
      navigate('/home');
      alert('Problem deleted successfully');
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  // const handleRun = async () => {
  //   const payload = {
  //     language,
  //     code,
  //   };

  //   try {
  //     const { data } = await axios.post('http://localhost:5000/sub/run', payload);
  //     setOutput(data.output);
  //     //console.log(data)
  //   } catch (error) {
  //     setOutput(error.response.data);
  //   }
  // };
  let flag=0;

  const handleSubmit = async () => {
   setCorrect(false);
   setcomp(false);
   comp=false;
    if(code==''){
      handleOutput();
      setOutput('Please write code')
      return;
  }
   handleVerdict();
   setTestDis([{}]);
   setCorrect(false);
  //  stmaxmem(0);
  //  stmaxtime(0);
   
   //console.log(inps.toString().trim());
   
    // try {
    //   const { data } = await axios.post('http://localhost:5000/sub/run/input', payload);
    //   setOutput(data.output);
    //   if (data.output === problem.output) {
    //     setCorrect(true);
    //     setSubmissionStatus('Accepted');
    //   } else {
    //     setCorrect(false);
    //     setSubmissionStatus('Wrong Answer');
    //   }
    // } catch (error) {
    //   console.error('Error submitting solution:', error);
    //   setOutput(error.response.data);
    // }
    try {
     
       inps=String(problem.input).split('\n')
       outs=String(problem.output).split('\n')
      //const tell=String(problem.input).split('\n')
     // console.log(tell)
      for(let i=0;i<inps.length;i++){
        flag=0;
        // maxmem=0;
        // maxtime=0;
          let inputTestCase = inps[i]+ " " + inps[i+1];
          let outputTestCase =outs[i];
          const payload = {
            language,
            code,
            input: inputTestCase,
          };
          
          
          const { data } = await axios.post('http://localhost:5000/sub/run/input', payload);
          let time = await data.timeTaken
          let memory= await data.memoryUsed; 
          
          
          
          if(maxtime<time){
           // stmaxtime(time)
           maxtime=time;
          }
          if(maxmem<memory){
           //stmaxmem(memory)
           maxmem=memory
          }
          if(time>problem.timec*1000){
            maxtime=problem.timec
            setCorrect(false);
            flag=0;
            comp=true;
            setcomp(true)
            //console.log(problem.timec)
               setTestDis(prevTestDis =>[
                   ...prevTestDis,
                   {
                       title:`TLE`,
                       color:'bg-red-400',
                       id:i+1
                   }
               ])
               return;
          }
          if(memory>problem.memoryc){
            maxmem=problem.memoryc
            setCorrect(false);
            flag=0;
            comp=true;
            setcomp(true)
            //console.log(flag,"galat")
               setTestDis(prevTestDis =>[
                   ...prevTestDis,
                   {
                       title:`MLE`,
                       color:'bg-red-400',
                       id:i+1
                   }
               ])
               return;
          }
          // maxtime=max(maxtime,time);
          // maxmem=max(maxmem,memory);
          
         // console.log(maxtime,maxmem)
          // maxmem=max(maxmem,data.memoryUsed);
          if(data.output == outputTestCase){
           flag=1;
           setCorrect(true)
           // console.log(flag,"sahi")
              setTestDis(prevTestDis =>[
                  ...prevTestDis,
                  {
                      title:`Test case ${i+1}`,
                      color:'bg-green-400',
                      id:i+1
                  }
              ])
          }
          else{
           // console.log(data.output)
           setCorrect(false);
           flag=0;
           comp=true;
           setcomp(true)
           //console.log(flag,"galat")
              setTestDis(prevTestDis =>[
                  ...prevTestDis,
                  {
                      title:`Test case ${i+1}`,
                      color:'bg-red-400',
                      id:i+1
                  }
              ])
              return;
          }
      }
      comp=true;
      setcomp(true);
     
       console.log(complete,verddisp)
  } catch (error) {
      handleOutput()
      if(language=='cpp'){
          // let word = "error:"
          // const compileMessage = error.response.data.data
          // let index = compileMessage.indexOf(word);
          // let result = compileMessage.slice(index + word.length);
          setOutput(error.response.data)
          // console.log(error.response.data)
          //setOutput(error:error)
          console.log(error)
      }
    }finally{
      try {
         if(flag==1) {
          setCorrect(true);
          const submission = await axios.post('http://localhost:5000/sub/submit',{problem_name:problem.name, code:code, verdict:true, problem_id:id, timeTaken:maxtime, memoryUsed:maxmem,user_id:user})
          //console.log(submission);
         }
      else {
        setCorrect(false);
        const submission = await axios.post('http://localhost:5000/sub/submit',{problem_name:problem.name, code:code, verdict:false, problem_id:id, timeTaken:maxtime, memoryUsed:maxmem,user_id:user})
       // console.log(submission);
      }
        //const submission = await axios.post('http://localhost:5000/sub/submit',{problem_name:problem.name, code:code, verdict:correct, problem_id:id, timeTaken:maxtime, memoryUsed:maxmem,user_id:user})
        
        //console.log({verdict:correct})
    } catch (error) {
        console.log(error);
    }


     
    }

  };

  const handleRun = async () => {
   // const inpt=[1,2]
    const payload = {
      language,
      code,
      input: customInput,
    };
    //console.log(customInput)

    try {
      const { data } = await axios.post('http://localhost:5000/sub/run/input', payload);
      setOutput(data.output);
      //console.log(data.output)
      handleOutput();
    } catch (error) {
      handleOutput();
      setOutput(error.response.data);
    }
  };

  return (
    <>
      {isAdmin ? <Navbar_admin profilePicture={profilePicture}/> : <Navbar profilePicture={profilePicture}/>}
      <div className="min-h-screen pt-10 bg-gray-900 text-white pt-28">
        {isAdmin && (
          <div className="admin-buttons mx-10 mb-5">
            <a href={`/editproblem/${problem._id}`}>
              <button className="btn w-40 text-1xl text-white mx-5 bg-yellow-700 hover:bg-yellow-900 ">Edit</button>
            </a>
            <button onClick={() => handleDelete(problem._id)} className="btn w-40 text-1xl text-white hover:bg-red-900 mx-5 bg-red-700 mt-5">
              Delete
            </button>
          </div>
        )}
        <div className="flex flex-col md:flex-row ml-5 mr-5 text-white">
          <div className="Question md:w-1/2 w-full mt-5">
            <h1 className="text-3xl mt-5">{problem.name}</h1>
            <hr className="w-2/3 mt-2 mb-5" />
            <h1 className="mt-5">Difficulty: {problem.difficulty}</h1>
            <span>
              <h1 className="mt-5">Time constraint: {problem.timec}</h1>
            </span>
            <p className="mt-5 mb-5 border rounded p-3 mr-5 bg-gray-800">{problem.description}</p>
            <h1 className="text-2xl mb-3">Test Cases:</h1>
            <h1 className="font-bold">Input:</h1>
            <div className="border p-2 overflow-auto bg-gray-800 mr-5">{String(problem.input).split('\n')[0]}</div>
            <h1 className="font-bold mt-5">Output:</h1>
            <p className="mb-5 border p-2 overflow-auto bg-gray-800 mr-5">{String(problem.output).split('\n')[0]}</p>
          </div>
          <div className="code md:w-1/2 w-full mt-5">
            <select
              value={language}
              onChange={(e) => setLang(e.target.value)}
              className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-3 focus:outline-none focus:border-indigo-500"
            >
              <option value="cpp">C++</option>
              {/* Add other language options as needed */}
            </select>
            <div className="editor-container border rounded bg-gray-800 p-2 overflow-auto">
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                className="code-editor overflow-auto "
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: 16,
                  minHeight: '300px',
                  backgroundColor: '#282c34',
                  color: '#abb2bf',
                }}
              />
            </div>
            {/* <Tabs className="mt-5">
              <TabList>
                <Tab>Console Output</Tab>
                <Tab>Custom Input</Tab>
              </TabList>

              <TabPanel>
                <div className="display mt-5 min-h-20 border rounded-md border-white p-3 bg-gray-800">
                  {output && <div className="text-white">{output}</div>}
                  {submissionStatus && (
                    <div className={`p-3 text-white ${correct ? 'text-green-400' : 'text-red-400'}`}>{submissionStatus}</div>
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="custom-input mt-5">
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Enter custom input here..."
                    className="w-full h-32 p-2 border rounded bg-gray-800 text-white"
                  />
                  <button className="btn w-full bg-blue-700 hover:bg-blue-600 text-black mt-2" onClick={handleCustomRun}>
                    Run with Custom Input
                  </button>
                  <div className="custom-output mt-5 min-h-20 border rounded-md border-white p-3 bg-gray-800">
                    {customOutput && <div className="text-white">{customOutput}</div>}
                  </div>
                </div>
              </TabPanel>
            </Tabs> */}
<div className='mt-5 mb-5 '>


                        <div className={`border-t rounded border-x w-fit font-semibold p-1   text-white text-1xl inline ${inpdisp?'text-blue-300 text-2xl':''} ml-1 `} onClick={handleInput} >Input</div>
                        <div className={`border-t border-x w-fit font-semibold p-1 mt-8 text-white text-1xl inline  ${outdisp?'text-blue-300 text-2xl':''} rounded-t`} onClick={handleOutput}>Output</div>

                        <div className={`border-t border-x w-fit font-semibold  mt-8 p-1 text-white text-1xl inline ${verddisp?'text-blue-300 text-2xl':''} rounded-t`} onClick={handleVerdict} >Verdict</div>

                        {verddisp&&complete?<div className={`w-fit   ${correct?'text-green-400':'text-red-400'} text-2xl inline ${correct==='passed'} ml-1 `}>{correct?'Passed':'Failed'}</div>:''}
                        {outdisp?<div className='bg-zinc-800 min-h-20 rounded mt-2 p-2 shadow-large text-white overflow-auto'>
                            {output}
                        </div>:''}
                        {inpdisp?<textarea value={customInput} onChange={(e) => setCustomInput(e.target.value)} className='bg-zinc-800 min-h-20 mt-3 flex  rounded-lg shadow-large w-full p-3'></textarea>:''}
                        {verddisp?<div className='bg-zinc-800 min-h-20 mt-3 rounded-lg shadow-large  text-white'>
                            {
                                testDis.map((testcase)=>(
                                        <div key={testcase.id} className={`${testcase.color} text-black text-sm w-fit mt-2 rounded-md inline-block mx-1  p-1 shadow-md`}>
                                            {testcase.title} 
                                        </div>
                                ))
                            }
                        </div>:''}


                        </div>




            <div className="flex justify-between mt-5 space-x-2">
              <button className="btn w-1/2 bg-blue-700 hover:bg-blue-600 text-white py-2" onClick={handleRun}>
                RUN
              </button>
              <button className="btn w-1/2 bg-green-700 hover:bg-green-600 text-white py-2" onClick={handleSubmit}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Questpage;