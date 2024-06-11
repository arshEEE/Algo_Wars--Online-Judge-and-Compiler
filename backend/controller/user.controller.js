import User from "../models/user.model.js";
import bcryptjs from "bcryptjs" 
import jwt from "jsonwebtoken"

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
                
                
                    

                }}
            

            }
            
        catch (error) {
            console.log("Error: " + error.message);
            res.status(500).json({message: "Internal server error"});
        }
    }


    export const updateUser = async (req, res) => {
       
        const { _id } = req.user._id;
        const {fullname , usertag, email ,password}=req.body;
        const user = await User.findByIdAndUpdate(_id, {
            fullname , usertag, email ,password
        }, { new: true }); 
        return res.status(201).json({message : "User updated sucessfully", user});
    };


    export const logoutUser =  (async(req,res)=>{

       
        
         
         return res.clearCookie('accessToken').json({message:"User updated sucessfully"});
      
        
            }
         )
    





