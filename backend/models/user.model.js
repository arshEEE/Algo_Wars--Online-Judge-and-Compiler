import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
fullname:{
    type: String,
    default:null,
    required:true,
},
usertag:{
    type: String,
    default:null,
    required:true,
    unique:true,
},
email:{
    type: String,
    default:null,
    required:true,
    unique:true,
},

password:{
    type: String,
    required:true,
},

isadmin:{
    type: Boolean,
    default:false,
},
profilePicture: { 
    type: String ,
    default:null
}


});

// userSchema.methods.generateToken= async function(){
// try {
//     const token = jwt.sign({ _id: user._id,isadmin:user.isadmin }, process.env.SECRET_KEY, {
//         expiresIn: "1d",
//     });
//     return token
    
// } catch (error) {
//     console.error(error);
// }
// }

const User = mongoose.model("User",userSchema);

export default User;