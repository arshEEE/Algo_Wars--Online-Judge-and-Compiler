
import Home from "./pages/Home";

import { Route, Routes } from "react-router-dom"

import Questpage from "./pages/Questpage";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Submission from "./pages/Submission";
import Editprofile from "./pages/Editprofile";
import CreateProblem from "./pages/createproblem";
import EditProblem from "./pages/editproblem";
import Subpage from "./pages/Subpage";
import Main from "./pages/Main";
import AdminCont from "./pages/AdminCont";


function App() {
  return (
    <>
    
    {/* <Problem/> */}
     
     <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/getproblem/:id" element={<Questpage/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/profile/edit" element={<Editprofile/>}/>
      <Route path="/createproblem" element={<CreateProblem/>}/>
      <Route path="/editproblem/:id" element={<EditProblem/>}/>

      <Route path="/admin" element={<AdminCont/>}/>


      <Route path="/getsub/:id" element={<Subpage/>}/>
      <Route path="/" element={<Main/>}/>

      <Route path="/sub" element={<Submission/>}/>



     </Routes>

    </>
  )
}


export default App;