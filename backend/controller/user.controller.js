import User from "../models/user.model.js";
import bcryptjs from "bcryptjs" 
import jwt from "jsonwebtoken"
import multer from "multer"

export const getUser= async(req,res)=>{
    try{
        const isadmin = req.user.isadmin
        const user = await User.find({_id:req.user._id});
        res.status(200).json({message:"user fetched successfully ",user,isadmin});
    }
    catch(error){
        console.log("Error: "+error);
        res.status(500).json(error);
    }
}


    export const registerUser = async(req,res)=>{
        try {
            const {fullname , usertag, email ,password}=req.body;
            const user = await User.findOne({email});
            const sameTag = await User.findOne({usertag});
            
            if(user){
                return res.status(400).json({message:"User already exists"})
                
            }
            else if(sameTag){
                return res.status(400).json({message:"User with same Usertag already exists"})
            }
            else{
                const hashPassword = await bcryptjs.hash(password,10);
                const CreatedUser= await User.create({
                    fullname : fullname,
                    usertag : usertag,
                    email : email,
                    password : hashPassword
                })

                const options = {
                    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                     //only manipulate by server not by client/user
                     httpOnly:true


                };

                
                    const token = jwt.sign({_id: CreatedUser._id }, process.env.SECRET_KEY, {
                        expiresIn: "1d",
                    
                    });
        

                return res.cookie("acessToken", token,options).status(200).json({message:"User Registered sucessfully",CreatedUser})


            }
            
        } catch (error) {
            console.log("Error: " + error.message);
            res.status(500).json({message: "Internal server error"});
        }
    }


    export const loginUser = async(req,res)=>{
        try {
            const { email ,password }=req.body;
            const user = await User.findOne({email});

            
            
           
           
            if(!user ){
                return res.status(400).json({message:"Invalid user credentials"})
                
            }
           
            else{
                const isMatch = await bcryptjs.compare(password,user.password);

                if(isMatch){
                    const options = {
                        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                         //only manipulate by server not by client/user
                         httpOnly:true
    
                    };
    
                    
                        const token = jwt.sign({_id:user._id }, process.env.SECRET_KEY, {
                            expiresIn: "1d",
                        });
                  
    
                    return res.cookie("acessToken", token,options).status(200).json({message:"User logged in sucessfully"
                    
                }) 
                }
                else{
                    return res.json({message:"Wrong Password!"})
                }
            
            
            
            }
            

            }
            
        catch (error) {
            console.log("Error: " + error.message);
            res.status(500).json({message: "Internal server error"});
        }
    }


    export const updateUser = async (req, res) => {
       
        const { _id } = req.user._id;
        const {fullname , usertag, email ,password}=req.body;

        const hashPassword = await bcryptjs.hash(password,10);

        const user = await User.findByIdAndUpdate(_id, {
            fullname : fullname,
            usertag : usertag,
            email : email,
            password : hashPassword
        }, { new: true }); 



        // const CreatedUser= await User.create({
        //     fullname : fullname,
        //     usertag : usertag,
        //     email : email,
        //     password : hashPassword
        // })

        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
             //only manipulate by server not by client/user
             httpOnly:true


        };

            const token = jwt.sign({_id: user._id }, process.env.SECRET_KEY, {
                expiresIn: "1d",
            
            });





 

            return res.cookie("acessToken", token,options).status(200).json({message : "User updated sucessfully", user})

       // return res.status(201).json({message : "User updated sucessfully", user});
    };


    export const logoutUser =  (async(req,res)=>{

       
        
         
         return res.clearCookie('accessToken').json({message:"User updated sucessfully"});
      
        
            }
         )
    

 

  export const uploadProfilePic =async (req, res) => {
    if (req.file) {
        const profilePictureUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        try {
          const userId = req.user._id; 
          const user = await User.findById(userId);
          if (user) {
            user.profilePicture = profilePictureUrl;
            await user.save();
            res.json({ success: true, profilePictureUrl: profilePictureUrl });
          } else {
            res.status(404).json({ success: false, message: 'User not found' });
          }
        } catch (error) {
          res.status(500).json({ success: false, message: 'Server error' });
        }
      } else {
        res.status(400).json({ success: false, message: 'File upload failed' });
      }
  }

  export const getUsers= async(req,res)=>{
    try{
        const isadmin = req.user.isadmin
        const users = await User.find({});
        res.status(200).json({message:"user fetched successfully ",users,isadmin});
    }
    catch(error){
        console.log("Error: "+error);
        res.status(500).json(error);
    }
}

export const updateStatus=async (req, res) => {
    try {
      const { isadmin } = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, { isadmin }, { new: true });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  export const deleteUser = (async (req, res) => {
    // if (!req.user.isadmin) {
    //     res.status(403).send("Unauthorised Request 1")
    // }
    const id = req.params.id;
    // const isadmin = req.user.isadmin

    const data = await User.findByIdAndDelete(id);
    return res.status(201).json({message:"User deleted Successfully",data, id});
});

