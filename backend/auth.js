import jwt from "jsonwebtoken";
import User from "./models/user.model.js";



const auth = async(req,res, next) => {
    try {
        
        const token = await req.cookies.acessToken;
      
        if (!token) {
          return  res.send(req.cookies.acessToken)
        }
         const key = process.env.SECRET_KEY
        const isVerified = await jwt.verify(token, process.env.SECRET_KEY)
        //console.log(decodedToken);
        
        const user = await User.findOne({_id:isVerified._id }).select("-password")
    
        if (!user) {

            
            
            return res.status(401).json({message:"Invalid acess token"})
        }
    
        req.user = user;
        next()

    } catch (error) {
      return  res.status(401).json({message:"Invalid acess token"})
    }
}

export default auth ;