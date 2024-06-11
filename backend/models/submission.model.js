import mongoose from "mongoose";

const subSchema = new mongoose.Schema({

    problem_name:{
   type: String
    },

problem_id:{
   type : String
},
user_id:{
    type : String

},
verdict:{
    type : Boolean,
    default : false
},
code:{
  type : String
}

}
)



const Subm = mongoose.model("Submission",subSchema);

export default Subm;