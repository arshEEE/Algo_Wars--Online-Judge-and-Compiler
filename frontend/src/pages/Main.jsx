import React from 'react';
import { Link } from 'react-router-dom';
import bgr from '../assets/home.jpg'; // Import your background image

const MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgr})` }}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center w-full bg-black bg-opacity-60">
      {/* Header Section */}
      <header className="text-center py-12 ">
        <h1 className="text-5xl font-semibold mb-4 text-white">Welcome to Algo_wars</h1>
        <p className="text-lg mb-4 max-w-3xl mx-auto text-white">
          An online judge and compiler platform where you can solve coding challenges,
          compete with others, and improve your programming skills.
        </p>
       
      </header>

      {/* Additional Content Section */}
      <section className="bg-gray-800 text-white rounded py-12 px-5 bg-opacity-75">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Start Coding Challenges Today</h2>
          <p className="text-lg mb-6">
            Choose from a variety of coding problems, practice coding languages,
            and see immediate results with our online compiler.
          </p>
          <div className="flex justify-center space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-black font-semibold px-6 py-3 rounded-lg">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg">
              Sign Up
            </button>
          </Link>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gray-800 bg-opacity-75 w-full text-center py-4">
        <p className="text-white">
          &copy; {new Date().getFullYear()} algo_wars - All rights reserved
        </p>
      </footer>
      </div>
    </div>
  );
};

export default MainPage;
