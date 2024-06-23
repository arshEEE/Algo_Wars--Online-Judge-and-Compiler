import React from 'react';
import { Navigate } from 'react-router-dom';

function Navbar_admin({ profilePicture }) {
  return (
    <div className="fixed w-full bg-gray-800 text-white shadow-lg z-50 ">
      <div className="navbar container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost btn-circle text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gray-800 mt-3 z-[1] p-2 shadow-lg rounded-box w-52 text-white text-lg">
              <li className="hover:bg-gray-700 rounded"><a href="/home">Home</a></li>
              <li className="hover:bg-gray-700 rounded"><a href="/sub">Submissions</a></li>
              <li className="hover:bg-gray-700 rounded"><a href="/admin">Users</a></li>

              <li className="hover:bg-gray-700 rounded"><a href="/createproblem">Add Problem</a></li>
              <li className="hover:bg-gray-700 rounded"><a href="/logout">Logout</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          
          <a className="text-2xl font-semibold text-white">Algo_wars</a>
        </div>
        <div className="navbar-end">
          <div >
            <a href='/profile'>
            <button  tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Profile" src={profilePicture || "https://via.placeholder.com/150"} />
              </div>
            </button>

            </a>
           
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar_admin;
