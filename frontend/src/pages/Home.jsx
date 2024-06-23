
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Navbar_admin from '../components/Navbar_admin';

function Home() {
  const [problems, setProblems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState('');


  useEffect(() => {
    //setLoad(true);
    const getUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/user', { withCredentials: true });
        if (res.data === "Unauthorised Request") {
          navigate("/");
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
    const getProblems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/problem', { withCredentials: true });
        if (res.data === 'Unauthorised Request') {
          navigate('/login');
        } else {
          setProblems(res.data.problems);
          setIsAdmin(res.data.isadmin);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProblems();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <>
      {isAdmin ? <Navbar_admin profilePicture={profilePicture}/> : <Navbar profilePicture={profilePicture}/>}
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-center mb-5">Problems</h1>
          <div className="text-white">
            <div className="pt-5">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="text-xl text-white border-b border-gray-700">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-600 transition duration-200`}
                    >
                      <td className="py-2 px-4">
                        <a href={`/getproblem/${problem._id}`} className="text-blue-400 hover:text-blue-200">
                          {problem.name}
                        </a>
                      </td>
                      <td className="py-2 px-4">
                        <a
                          href={`/getproblem/${problem._id}`}
                          className={`px-2 py-1 rounded font-semibold inline-block ${getDifficultyColor(problem.difficulty)}`}
                        >
                          {problem.difficulty}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;