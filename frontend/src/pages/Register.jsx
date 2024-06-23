
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      usertag: data.usertag,
      email: data.email,
      password: data.password,
    };
    await axios
      .post('http://localhost:5000/user/register', userInfo, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          alert('Sign-Up Successful');
          navigate('/home');
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          alert('Error: ' + err.response.data.message);
        }
      });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md">
          <h1 className="text-center text-5xl font-semibold mb-10 text-green-500">Algo_wars</h1>
          <div className="bg-gray-800 shadow-md rounded-lg px-8 py-10">
            <h2 className="text-center font-bold text-2xl text-white mb-6">Sign-Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="fullname">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  {...register('fullname', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.fullname && <span className="text-red-500 text-sm">This field is required.</span>}
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="usertag">
                  User Tag
                </label>
                <input
                  type="text"
                  id="usertag"
                  {...register('usertag', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.usertag && <span className="text-red-500 text-sm">This field is required.</span>}
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.email && <span className="text-red-500 text-sm">This field is required.</span>}
              </div>
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.password && <span className="text-red-500 text-sm">This field is required.</span>}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-center text-white mt-4">
              Already have an account?{' '}
              <a className="text-blue-500 hover:text-blue-700" href="/login">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;