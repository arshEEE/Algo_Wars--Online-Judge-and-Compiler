import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar_admin from '../components/Navbar_admin';
import Navbar from '../components/Navbar';



function Subpage() {
  const [submission, setSub] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAdmin, setAdmin] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  useEffect(() => {
    //setLoad(true);
    const getUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/user', { withCredentials: true });
        if (res.data === "Unauthorised Request") {
          navigate("/login");
        } else {
          // setLoad(false);
          
          setProfilePicture(res.data.user[0].profilePicture || '');
        }
      } catch (error) {
        setLoad(false);
        console.log(error);
      }
    };
    getUser();
   // console.log(user,profilePicture)
  }, []);

  useEffect(() => {
    const getSubmission = async () => {
      await axios.get(`http://localhost:5000/sub/getsub/${id}`, { withCredentials: true })
        .then((res) => {
          if (res.data === "Unauthorised Request") {
            navigate("/");
          } else {
            setSub(res.data.submission);
            setAdmin(res.data.isadmin);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSubmission();
  }, [id, navigate]);

  return (
    <>
      {isAdmin ? <Navbar_admin profilePicture={profilePicture}/> : <Navbar profilePicture={profilePicture}/>}
      <div className='bg-gray-900 min-h-screen p-5 flex flex-col items-center pt-28'>
        <div className='bg-gray-800 w-full max-w-4xl p-10 rounded-lg shadow-md'>
          <div className='mb-5'>
            <h1 className='text-white text-2xl font-bold inline-block mr-2'>Problem Name:</h1>
            <p className='text-green-400 text-2xl inline-block'>{submission.problem_name}</p>
          </div>

          <div className='mb-5'>
            <h1 className='text-white text-2xl font-bold inline-block mr-2'>Verdict:</h1>
            <p className={`text-2xl inline-block ${submission.verdict ? 'text-green-400' : 'text-red-400'}`}>
              {submission.verdict ? 'Passed' : 'Failed'}
            </p>
          </div>

          <div className='mb-5'>
            <h1 className='text-white text-2xl font-bold inline-block mr-2'>Time Taken:</h1>
            <p className='text-blue-400 text-2xl inline-block'>{submission.timeTaken} ms</p>
          </div>

          <div className='mb-5'>
            <h1 className='text-white text-2xl font-bold inline-block mr-2'>Memory Used:</h1>
            <p className='text-blue-400 text-2xl inline-block'>{submission.memoryUsed} KB</p>
          </div>

          <h1 className='text-white text-2xl font-bold mb-3'>Code:</h1>
          <pre className='bg-gray-700 text-white p-5 rounded-md overflow-x-auto whitespace-pre-wrap'>
            <code>
              {submission.code}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}

export default Subpage;
