import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Navbar_admin from '../components/Navbar_admin';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Profile() {
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [chartData, setChartData] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoad(true);
    const getUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/user', { withCredentials: true });
        if (res.data === "Unauthorised Request") {
          navigate("/login");
        } else {
          setLoad(false);
          setUser(res.data.user[0]);
          setAdmin(res.data.isadmin);
          setProfilePicture(res.data.user[0].profilePicture || '');
          
        }
      } catch (error) {
        setLoad(false);
        console.log(error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getSubs = async () => {
      await axios.get("http://localhost:5000/sub/allsubs", { withCredentials: true })
        .then((res) => {
          if (res.data === "Unauthorised Request") {
            navigate("/login");
          } else {
            const sortedSubs = res.data.submissions.sort((a, b) => new Date(b.submissionTime) - new Date(a.submissionTime));
            setSubmissions(sortedSubs);
            processSubmissions(sortedSubs);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSubs();
  }, [navigate]);

  const processSubmissions = (submissions) => {
    const uniqueProblems = {};
    submissions.forEach(submission => {
      if (!uniqueProblems[submission.problem_id]) {
        uniqueProblems[submission.problem_id] = submission.verdict;
      } else {
        if (submission.verdict) {
          uniqueProblems[submission.problem_id] = true;
        }
      }
    });

    const totalQuestions = Object.keys(uniqueProblems).length;
    const correctAnswers = Object.values(uniqueProblems).filter(verdict => verdict).length;
    const wrongAnswers = totalQuestions - correctAnswers;

    setChartData({
      labels: ['Questions Attempted', 'Passed', 'Failed'],
      datasets: [
        {
          label: 'Submissions Statistics',
          data: [totalQuestions, correctAnswers, wrongAnswers],
          backgroundColor: ['#2196f3', '#4caf50', '#f44336']
        }
      ]
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);

      try {
        const res = await axios.post('http://localhost:5000/user/uploadProfilePicture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });

        if (res.data.success) {
          setProfilePicture(res.data.profilePictureUrl); // Ensure this URL is correct
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {isAdmin ? <Navbar_admin profilePicture={profilePicture}/> : <Navbar profilePicture={profilePicture}/>}
      <div className='min-h-screen text-center text-white bg-gray-900 py-10 pt-28'>
        <div className='bg-gray-800 shadow-md rounded-lg p-8 max-w-lg mx-auto'>
          <h1 className='text-3xl font-bold mb-6 text-white'>Profile</h1>
          <hr className='w-2/3 mx-auto mb-6 border-gray-700' />
          {load ? (
            <h1 className='text-xl text-white'>Your Data is being loaded...</h1>
          ) : (
            <div className='my-6'>
              <div className='flex flex-col items-center'>
                <div className='relative'>
                  <img 
                    src={profilePicture  ||'https://via.placeholder.com/150'} 
                    alt="Profile"
                    className='rounded-full w-40 h-40 object-cover mb-4 cursor-pointer border-2 border-gray-500'
                    onClick={handleProfilePictureClick}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
              <ul className='mt-6'>
                <li className='border-b py-2 flex justify-between items-center border-gray-700'>
                  <label className='font-bold text-gray-300'>Full Name:</label>
                  <span className='text-green-500'>{user.fullname}</span>
                </li>
                <li className='border-b py-2 flex justify-between items-center border-gray-700'>
                  <label className='font-bold text-gray-300'>User Tag:</label>
                  <span className='text-green-500'>{user.usertag}</span>
                </li>
                <li className='border-b py-2 flex justify-between items-center border-gray-700'>
                  <label className='font-bold text-gray-300'>Email:</label>
                  <span className='text-green-500'>{user.email}</span>
                </li>
                <li className='mt-7'>
                  <h1 className='text-xl font-bold mb-2 text-white'>Edit profile:</h1>
                  <a href='/profile/edit'>
                    <button className='bg-blue-500 text-white text-lg py-2 px-4 rounded hover:bg-blue-600'>
                      Edit
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
    
      {chartData && (
        <div className='bg-gray-800 shadow-md rounded-lg p-8 max-w-lg mx-auto mt-8'>
          <h2 className='text-2xl font-bold mb-4 text-white'>Submission Statistics</h2>
          <Bar data={chartData} />
        </div>
      )}
        </div>
      <Footer />
    </>
  );
}

export default Profile;
