
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user/logout`,{withCredentials:true});
        if (res.data === "Unauthorised Request") {
          navigate("/");
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Logout error:", error);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {loading ? (
        <p className="text-3xl font-bold mb-6">Logging out...</p>
      ) : (
        <>
          <p className="text-4xl font-bold mb-6">You have been successfully logged out!</p>
          <p className="text-xl mb-12">Thank you for using<span className='font-semibold text-2xl text-green-600'> Algo_wars</span>. Log in again to continue.</p>
          <a href="/login" className="text-blue-400 hover:underline  text-3xl">Log in</a>
        </>
      )}
    </div>
  );
}

export default Logout;