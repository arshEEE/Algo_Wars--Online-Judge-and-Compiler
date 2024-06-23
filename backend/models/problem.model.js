import mongoose,{Schema} from'mongoose';

const problemSchema = new mongoose.Schema({

    description:{
        type : String
    },
    name:{
      type:  String
    },

    input:{
     type : []
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
    },
    memoryc:{
      type:Number,
      default:256
    },
    tag: {
      type: [String],
      default: []
  }, 
//   testcases: {
//     type: [Schema.Types.Mixed],
//     default: []
// },


})

const Problem= mongoose.model("problem",problemSchema);

export default Problem