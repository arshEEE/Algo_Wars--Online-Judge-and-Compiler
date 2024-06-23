import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar_admin from '../components/Navbar_admin';
import Footer from '../components/Footer';

function EditProblem() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prob, setProb] = useState(null);
  const [loading, setLoading] = useState(false);
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
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/problem/getproblem/${id}`, { withCredentials: true });
        if (res.data === 'Unauthorised Request') {
          navigate('/login');
        } else {
          setProb(res.data.problem);
        }
      } catch (error) {
        console.error('Error fetching problem:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProb(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const probInfo = {
      name: prob.name,
      description: prob.description,
      difficulty: prob.difficulty,
      input: prob.input,
      output: prob.output,
      timec: parseInt(prob.timec),
    };

    try {
      const res = await axios.put(`http://localhost:5000/problem/update/${id}`, probInfo, { withCredentials: true });
      if (res.data) {
        alert('Problem Edited Successfully');
        navigate(`/getproblem/${res.data.problem._id}`);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        alert('Error: ' + err.response.data.message);
      }
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <Navbar_admin profilePicture={profilePicture} />

      <div className="flex items-center justify-center">
        <h1 className="text-3xl mt-10 mb-5 text-white">Edit Problem</h1>
      </div>

      <div className="w-full max-w-2xl mx-auto p-8 bg-gray-800 rounded-md shadow-lg">
        <div className="space-y-4">
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 px-3">
              <label className="text-white block">Name:</label>
              <input
                type="text"
                name="name"
                value={prob?.name || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100"
                placeholder="Enter problem name"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="text-white block">Difficulty:</label>
              <input
                type="text"
                name="difficulty"
                value={prob?.difficulty || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100"
                placeholder="Enter difficulty (easy, medium, hard)"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-white block">Time constraint (In seconds):</label>
            <input
              type="number"
              name="timec"
              value={prob?.timec || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100"
              placeholder="Enter time constraint"
            />
          </div>

          <div className="mb-4">
            <label className="text-white block">Description:</label>
            <textarea
              name="description"
              value={prob?.description || ''}
              onChange={handleInputChange}
              className="w-full h-40 px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100"
              placeholder="Enter problem description"
            />
          </div>

          <div className="mb-4">
            <h2 className="text-white text-2xl">Test cases:</h2>

            <label className="text-white block">Input:</label>
            <textarea
              name="input"
              value={prob?.input || ''}
              onChange={handleInputChange}
              className="w-full h-40 px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100"
              placeholder="Enter test case inputs"
            />

            <label className="text-white block mt-4">Output:</label>
            <textarea
              name="output"
              value={prob?.output || ''}
              onChange={handleInputChange}
              className="w-full h-40 px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100"
              placeholder="Enter expected outputs"
            />
          </div>

          <button
            onClick={onSubmit}
            className="bg-white text-black text-2xl hover:bg-green-500 w-full py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EditProblem;
