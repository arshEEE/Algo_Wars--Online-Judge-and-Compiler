import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Navbar_admin from '../components/Navbar_admin';

function Editprofile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const [isadmin, setAdmin] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');


  useEffect(() => {
    setLoad(true);
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user`, { withCredentials: true });
        if (res.data === "Unauthorised Request") {
          navigate("/");
        } else {
          setLoad(false);
          setUser(res.data.user[0]); // Store the user object correctly
          setAdmin(res.data.isadmin);
          setProfilePicture(res.data.user[0].profilePicture || '');

          console.log("User Data Fetched:", res.data.user[0]); // Log user data for debugging
        }
      } catch (error) {
        setLoad(false);
        console.log("Error fetching user data:", error);
      }
    };
    getUser();
  }, []);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (user) {
      // Set initial form values once user data is fetched
      setValue('fullname', user.fullname);
      setValue('usertag', user.usertag);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      usertag: data.usertag,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.put("http://localhost:5000/user/edit", userInfo, { withCredentials: true });
      console.log(res.data);
      if (res.data) {
        alert("User updated successfully");
        navigate("/profile");
      }
    } catch (err) {
      if (err.response) {
        console.log("Update error:", err.response.data);
        alert("Error: " + err.response.data.message);
      }
    }
  };

  // Return loading message while fetching user data
  if (load) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-4xl">
        Loading...
      </div>
    );
  }

  // Return actual form once user data is fetched
  return (
    <>
      {isadmin ? <Navbar_admin profilePicture={profilePicture}/> : <Navbar profilePicture={profilePicture}/>}
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="flex justify-center items-center min-h-screen">
          <div className="signup-box border w-full sm:w-[360px] h-auto mx-auto p-5 border-radius-5 rounded-md bg-gray-800">
            <h1 className="text-center text-3xl mt-8 mb-6 text-white">Edit Your Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
              <div className="mb-4">
                <label htmlFor="fullname" className="text-white">Full Name:</label>
                <input
                  type="text"
                  id="fullname"
                  {...register("fullname", { required: true })}
                  className="w-full px-2 py-1 rounded-md bg-gray-700 text-white"
                />
                {errors.fullname && <span className="text-red-400">This field is required.</span>}
              </div>

              <div className="mb-4">
                <label htmlFor="usertag" className="text-white">User Tag:</label>
                <input
                  type="text"
                  id="usertag"
                  {...register("usertag", { required: true })}
                  className="w-full px-2 py-1 rounded-md bg-gray-700 text-white"
                />
                {errors.usertag && <span className="text-red-400">This field is required.</span>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="text-white">Email:</label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="w-full px-2 py-1 rounded-md bg-gray-700 text-white"
                />
                {errors.email && <span className="text-red-400">This field is required.</span>}
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="text-white">Password:</label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: true })}
                  className="w-full px-2 py-1 rounded-md bg-gray-700 text-white"
                  placeholder="Enter your new password"
                />
                {errors.password && <span className="text-red-400">This field is required.</span>}
              </div>

              <input
                type="submit"
                className="bg-white text-black text-2xl hover:bg-green-500 w-full rounded-md py-2"
                value="Update"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Editprofile;
