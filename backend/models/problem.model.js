import mongoose from'mongoose';

const problemSchema = new mongoose.Schema({

    description:{
        type : String
    },
    name:{
      type:  String
    },

    input:{
     type : [ ]
    },

    output :{
     type:[]
    },

    timec :{
      type : Number,
      default:10
    }
    ,
    difficulty :{
      type:String,
      default:"Easy"
    }

})

const Problem= mongoose.model("problem",problemSchema);

export default Problem