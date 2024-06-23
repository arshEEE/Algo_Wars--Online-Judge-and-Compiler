import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar_admin from '../components/Navbar_admin';

function Submission() {
  const [subs, setSubs] = useState([]);
  const navigate = useNavigate();
  const [isAdmin, setAdmin] = useState(false);
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
    const getSubs = async () => {
      await axios.get("http://localhost:5000/sub/allsubs", { withCredentials: true })
        .then((res) => {
          if (res.data === "Unauthorised Request") {
            navigate("/login");
          } else {
            const sortedSubs = res.data.submissions.sort((a, b) => new Date(b.submissionTime) - new Date(a.submissionTime));

            setSubs(sortedSubs);
            setAdmin(res.data.isadmin);
           // console.log(subs);
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getSubs();
  }, [navigate]);

  return (
    <>
      {isAdmin ? <Navbar_admin profilePicture={profilePicture}/> : <Navbar profilePicture={profilePicture}/>}

      <div className="min-h-screen bg-gray-900 text-white py-10 pt-28 ">
        <div className="container mx-auto">
          <h1 className="text-3xl text-center mb-10 font-semibold">Submissions</h1>
          <div className="overflow-x-auto rounded-t mx-8">
            <table className="table-auto w-full text-left">
              <thead className="bg-gray-800">
                <tr className="text-white text-2xl ">
                  <th className="px-4 py-2 font-semibold text-center">Name</th>
                  <th className="px-4 py-2 font-semibold text-center">Verdict</th>
                  <th className="px-4 py-2 font-semibold text-center">Submitted On</th>

                </tr>
              </thead>
              <tbody>
                {subs.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-700">
                    <td className="border px-4 py-2 text-center">
                      <a href={`/getsub/${p._id}`} className="text-blue-400 hover:underline">
                        {p.problem_name}
                      </a>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <a href={`/getsub/${p._id}`} className="text-blue-400 hover:underline">
                        {p.verdict ? (
                          <div className="text-green-400 ">Passed</div>
                        ) : (
                          <div className="text-red-500">Failed</div>
                        )}
                      </a>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <a href={`/getsub/${p._id}`} className="text-blue-400 hover:underline">
                        {p.submissionTime}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Submission;
