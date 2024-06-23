import Problem from "../models/problem.model.js";





export const createProblem = async (req, res) => {
    if (!req.user.isadmin) {
        res.status(403).send("Unauthorised Request")
    }
    const {         name,description, input, output ,timec, difficulty
    } = req.body;
    const problem = await Problem.create({
        name,description, input, output ,timec, difficulty
    });
    const isadmin = req.user.isadmin


    return res.status(201).json({message : "problem created sucessfully",problem,isadmin});
};

export const updateProblem = async (req, res) => {
    if (!req.user.isadmin) {
        res.status(403).send("Unauthorised Request")
    }
    const isadmin = req.user.isadmin

    const { _id } = req.params;
    const {         name,description, input, output ,timec, difficulty
    } = req.body;
    const problem = await Problem.findByIdAndUpdate(_id, {
        name,description, input, output ,timec, difficulty
    }, { new: true }); 
    return res.status(201).json({message : "problem updated sucessfully", problem,isadmin});
};

export const deleteProblem = (async (req, res) => {
    // if (!req.user.isadmin) {
    //     res.status(403).send("Unauthorised Request 1")
    // }
    const { _id } = req.params;
    // const isadmin = req.user.isadmin

    const problem = await Problem.findByIdAndDelete(_id);
    return res.status(201).json({message : "problem deleted sucessfully"});
});

export const getProblem =  async(req, res) => {
    const { _id } = req.params;
    // if(!_id){
    //  return res.json({Message:"no"})
    // }
    const isadmin = req.user.isadmin
    const userid =req.user._id

    const problem = await Problem.findById({_id});
    return res.status(201).json({message : "problem fetched sucessfully", problem,isadmin,userid});
};

export const getProblems = async(req,res)=>{
    const problems = await Problem.find();
    const isadmin = req.user.isadmin
    return res.status(201).json({message : "problems fetched sucessfully", problems,isadmin});
};


// const execute = ("/run", async (req, res) => {
   
//     const { language , code } = req.body;
//     if (code === undefined) {
//         return res.status(404).json({ success: false, error: "Empty code!" });
//     }
//     try {
//         const filePath = await generateFile(language, code);
//         const output = await executeCpp(filePath);
//         res.json({ filePath, output });
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// });



