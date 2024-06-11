import express from "express";
import { getUser, loginUser, logoutUser, registerUser, updateUser } from "../controller/user.controller.js";
import auth from "../auth.js";

const router = express.Router();


router.get("/",auth ,getUser);
router.post("/register",registerUser)
router.post("/login",loginUser)
router.put("/edit",auth,updateUser)
router.get("/logout",auth,(async(req,res)=>{

      
     
   
    
     res.clearCookie('acessToken')
     await req.user.save();
     res.json({message:"Logged out"})

    // res.json({token})
   
       }
    ))



export default router