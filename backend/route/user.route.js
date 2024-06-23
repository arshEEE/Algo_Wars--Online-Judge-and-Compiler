import express from "express";
import { deleteUser, getUser, getUsers, loginUser, logoutUser, registerUser, updateStatus, updateUser, uploadProfilePic } from "../controller/user.controller.js";
import auth from "../auth.js";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}







        // Configure Multer storage
        const storage = multer.diskStorage({
         destination: './uploads/',
         filename: (req, file, cb) => {
           cb(null, Date.now() + '-dp' + path.extname(file.originalname));
         }
       });
       
       const upload = multer({ storage });
            
router.get("/",auth ,getUser);
router.get("/all",auth ,getUsers);
router.post("/register",registerUser)
router.post("/login",loginUser)
router.put("/edit",auth,updateUser)
router.post("/uploadProfilePicture",auth, upload.single('profilePicture'),uploadProfilePic)
router.put("/admin/:id",auth ,updateStatus);
router.delete("/delete/:id",deleteUser)
router.get("/logout",auth,(async(req,res)=>{ 

      
     
   
    
     res.clearCookie('acessToken')
     await req.user.save();
     res.json({message:"Logged out"})

    // res.json({token})
   
       }
    ))



export default router