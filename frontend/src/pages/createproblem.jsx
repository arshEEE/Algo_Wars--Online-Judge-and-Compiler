
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar_admin from '../components/Navbar_admin';
import Footer from '../components/Footer';

function CreateProblem() {
  const { register, handleSubmit, formState: { errors } } = useForm();
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

  const onSubmit = async (data) => {
    const probInfo = {
      name: data.name,
      description: data.description,
      difficulty: data.difficulty,
      input: data.input,
      output: data.output,
      timec: parseInt(data.timec),
    };

    try {
      const res = await axios.post("http://localhost:5000/problem/create", probInfo, { withCredentials: true });
      if (res.data) {
        alert("Problem Added Successfully");
        navigate(`/getproblem/${res.data.problem._id}`);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        alert("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <>
      <Navbar_admin profilePicture={profilePicture} />

      <div className='flex items-center justify-center'>
        <h1 className='text-3xl mt-10 mb-5 text-white'>
          Add Problem
        </h1>
      </div>

      <div className="w-full max-w-2xl mx-auto p-8 bg-gray-800 rounded-md shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 px-3">
              <label className='text-white block'>Name:</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className='w-full px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100'
                placeholder="Enter problem name"
              />
              {errors.name && <span className='text-red-400'>This field is required.</span>}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className='text-white block'>Difficulty:</label>
              <input
                type="text"
                {...register("difficulty", { required: true })}
                className='w-full px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100'
                placeholder="Enter difficulty (easy, medium, hard)"
              />
              {errors.difficulty && <span className='text-red-400'>This field is required.</span>}
            </div>
          </div>

          <div className="mb-4">
            <label className='text-white block'>Time constraint (In seconds):</label>
            <input
              type="number"
              {...register("timec", { required: true })}
              className='w-full px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100'
              placeholder="Enter time constraint"
            />
            {errors.timec && <span className='text-red-400'>This field is required.</span>}
          </div>

          <div className="mb-4">
            <label className='text-white block'>Description:</label>
            <textarea
              {...register("description", { required: true })}
              className="w-full h-40 px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100"
              placeholder="Enter problem description"
            />
            {errors.description && <span className='text-red-400'>This field is required.</span>}
          </div>

          <div className="mb-4">
            <h2 className='text-white text-2xl'>Test cases:</h2>

            <label className='text-white block'>Input:</label>
            <textarea
              {...register("input", { required: true })}
              className="w-full h-40 px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100"
              placeholder="Enter test case inputs"
            />
            {errors.input && <span className='text-red-400'>This field is required.</span>}

            <label className='text-white block mt-4'>Output:</label>
            <textarea
              {...register("output", { required: true })}
              className="w-full h-40 px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:bg-gray-100"
              placeholder="Enter expected outputs"
            />
            {errors.output && <span className='text-red-400'>This field is required.</span>}
          </div>

          <input
            type="submit"
            className='bg-white text-black text-2xl hover:bg-green-500 w-full py-2 rounded-md'
            value="Submit"
          />
        </form>
      </div>

      <Footer />
    </>
  );
}

export default CreateProblem;