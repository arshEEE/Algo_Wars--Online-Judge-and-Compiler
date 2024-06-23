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
},
submissionTime: {
    type: Date,
    default: Date.now
},
timeTaken: {
    type: Number,
    default: 0
},
memoryUsed: {
    type: Number,
    default: 0
}

}
)



const Subm = mongoose.model("Submission",subSchema);

export default Subm;