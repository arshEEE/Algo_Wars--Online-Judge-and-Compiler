import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar_admin from '../components/Navbar_admin';
import Footer from '../components/Footer';

function AdminCont() {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
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
    setLoad(true);
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/user/all', { withCredentials: true });
        setUsers(res.data.users);
        setLoad(false);
      } catch (error) {
        console.log(error);
        setLoad(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleAdminStatus = async (userId, isAdmin) => {
    try {
      const res = await axios.put(`http://localhost:5000/user/admin/${userId}`, { isadmin: !isAdmin }, { withCredentials: true });
      setUsers(users.map(user => user._id === userId ? res.data : user));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
     const data= await axios.delete(`http://localhost:5000/user/delete/${userId}`);
     console.log(data,userId)
       setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar_admin profilePicture={profilePicture}/>
      <div className='min-h-screen text-center text-white bg-gray-900 py-10 pt-28'>
        <div className='bg-gray-800 shadow-md rounded-lg p-8 max-w-4xl mx-auto'>
          <h1 className='text-3xl font-bold mb-6 text-white'>Admin Dashboard</h1>
          <hr className='w-2/3 mx-auto mb-6 border-gray-700' />
          {load ? (
            <h1 className='text-xl text-white'>Loading Users...</h1>
          ) : (
            <table className='table-auto w-full text-left'>
              <thead>
                <tr>
                  <th className='px-4 py-2'>Profile Picture</th>
                  <th className='px-4 py-2'>Full Name</th>
                  <th className='px-4 py-2'>Email</th>
                  <th className='px-4 py-2'>Admin Status</th>
                  <th className='px-4 py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className='border-t border-gray-700'>
                    <td className='px-4 py-2'>
                      <img
                        src={user.profilePicture|| "https://via.placeholder.com/150"}
                        alt="Profile"
                        className='w-12 h-12 rounded-full object-cover'
                      />
                    </td>
                    <td className='px-4 py-2'>{user.fullname}</td>
                    <td className='px-4 py-2'>{user.email}</td>
                    <td className='px-4 py-2'>{user.isadmin ? 'Admin' : 'User'}</td>
                    <td className='px-4 py-2 flex space-x-2'>
                      <button
                        className={`bg-${user.isadmin ? 'red' : 'green'}-500 text-white px-4 py-2 rounded hover:bg-${user.isadmin ? 'red' : 'green'}-600`}
                        onClick={() => toggleAdminStatus(user._id, user.isadmin)}
                      >
                        {user.isadmin ? 'Remove Admin' : 'Make Admin'}
                      </button>
                      <button
                        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminCont;
