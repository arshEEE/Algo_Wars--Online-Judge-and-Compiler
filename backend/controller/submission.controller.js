import fs from 'fs';
import path from 'path';
import Subm from '../models/submission.model.js';
import { v4 as uuid } from 'uuid';
import { exec } from "child_process";
import { fileURLToPath } from 'url';
//import unlinkAsync from 
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

export const generateFile = async (format, content) => {
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    await fs.writeFileSync(filePath, content);
    // // const jobID = uuid();
    // const input_filename = `${jobID}.txt`;
    //  const input_filePath = path.join(dirInputs, input_filename);
    //  await fs.writeFileSync(input_filePath, "input");
    return filePath;
};

export const execute =  async (req, res) => {
   
    const { language , code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, message: "Empty code!" });
    }
    try {
        const filePath = await generateFile(language, code);
       // const output = await executeCpp(filePath);
        let output, timeTaken, memoryUsed, stderr;
        const { stderr: cppStderr, stdout: cppStdout, memoryUsed: cppMemoryUsed, timeUsed: cppTimeUsed } = await executeCpp(filePath);
        output = cppStdout;
        timeTaken = cppTimeUsed;
        memoryUsed = cppMemoryUsed;
        stderr = cppStderr;
        res.json({ filePath, output,timeTaken,memoryUsed });
    } catch (error) {
       const  message = error.stderr
        res.status(500).json(message);
    }finally {
        // Ensure files are deleted after processing
        try {
            await unlinkSync(filePath);
            //await unlinkAsync(inputPath);
        } catch (cleanupError) {
            console.error('Error deleting files:', cleanupError);
        }
    }
};




const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

export const executeCpp = async (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    // const outPath = path.join(outputPath, `${jobId}.exe`);

    const c = `./controller/codes/${jobId}.cpp`
    const v = `./controller/outputs/${jobId}.exe`
    // await fs.writeFileSync(outPath);

    return new Promise((resolve, reject) => {
        const startTime = process.hrtime.bigint(); // Start time
        exec(`g++ ${c} -o ${v} && cd controller && cd outputs && .\\${jobId}.exe `,
            (error, stdout, stderr) => {
                if (error) {
                    reject({  stderr });
                }
               else    {
                const endTime = process.hrtime.bigint(); // End time
                const timeUsed = Number(endTime - startTime) / 1e6; // Convert to milliseconds
                const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024; // Convert to megabytes
                resolve({ stdout, timeUsed, memoryUsed });
                   
                }
               // resolve(stdout);
            }
        );
    });
     //return jobId
};

// && cd ${v} && .\\${jobId}.exe


export const getsubs = async(req,res)=>{
    const submissions = await Subm.find({user_id:req.user._id});
    const isadmin = req.user.isadmin
    const id=req.user._id;
    return res.status(201).json({message : "Submissions fetched sucessfully", submissions,isadmin,id});
};


export const getSub =  async(req, res) => {
    const { _id } = req.params;
    // if(!_id){
    //  return res.json({Message:"no"})
    // }
    const isadmin = req.user.isadmin

    const submission = await Subm.findById({_id});
    return res.status(201).json({message : "Submission fetched sucessfully", submission,isadmin});
};





export const executeInp =  async (req, res) => {
   
    const { language , code,input } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, message: "Empty code!" });
    }
    try {
        console.log(input)
        const filePath = await generateFile(language, code,input);
        const inputPath = await generateInputFile(input);
         // const output = await executeCppInp(filePath,inputPath);
        //res.json({ filePath, output });
        let output, timeTaken, memoryUsed, stderr;
        const { stderr: cppStderr, stdout: cppStdout, memoryUsed: cppMemoryUsed, timeUsed: cppTimeUsed } = await executeCppInp(filePath,inputPath);
        output = cppStdout;
        timeTaken = cppTimeUsed;
        memoryUsed = cppMemoryUsed;
        stderr = cppStderr;
        res.json({ filePath, output,timeTaken,memoryUsed });




    } catch (error) {
       const message = error.stderr
        res.status(500).json(message);
    }
    finally {
        // Ensure files are deleted after processing
        try {
            // await unlinkSync(filePath);
            // await unlinkSync(inputPath);
        } catch (cleanupError) {
            console.error('Error deleting files:', cleanupError);
        }
    }
};

const dirInputs = path.join(__dirname, 'inputs');

if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (input) => {
    const jobID = uuid();
    const input_filename = `${jobID}.txt`;
     const input_filePath = path.join(dirInputs, input_filename);
     const content = {input};
    //  console.log(content);
     await fs.writeFileSync(input_filePath, input);
    return input_filePath;
};


export const executeCppInp = async (filepath,inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
     const outPath = path.join(outputPath, `${jobId}.exe`);
    const inpId = path.basename(inputPath).split(".")[0];
    const inp = `/${inpId}.txt`

    const c = `./controller/codes/${jobId}.cpp`
    const v = `./controller/outputs/${jobId}.exe`
    // await fs.writeFileSync(outPath);
    // g++ ${c} -o ${v} && cd controller/outputs && ./${jobId} < ../inputs${inp} linux

    return new Promise((resolve, reject) => {
        const startTime = process.hrtime.bigint(); // Start time

        exec(`g++ ${c} -o ${v} && cd controller\\outputs && ${jobId}.exe < ..\\inputs${inp}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({  stderr });
                }
            else  {
                const endTime = process.hrtime.bigint(); // End time
                const timeUsed = Number(endTime - startTime) / 1e6; // Convert to milliseconds
                const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024; // Convert to megabytes
                resolve({ stdout, timeUsed, memoryUsed });
                   
            }
            }
        );
    });
    // return inp
};

//  && cd controller && cd outputs && .\\${jobId}.exe <${inp}


// export const submit = async(req,res) => {
//     try{
//         const user_id = req.user._id;
//         const{ problem_name,code ,verdict,problem_id } = req.body
//          console.log(problem_name,code ,verdict,problem_id)
//         console.log("yo")
//         const submission = await Subm.create({
//             problem_name,code ,verdict,problem_id,user_id
//         });
//         //  console.log("heloo")
//        return res.status(201).json({message:"yo",submission})

//     }
//     catch(error){
//        return res.status(200).json({error})
//     }
    




// }


export const submit = async (req, res) => {
    try {
    

        const { problem_name, code, verdict, problem_id,timeTaken,memoryUsed,user_id } = req.body;
        
        // Log the incoming data
       // console.log("Received data:", { problem_name, code, verdict, problem_id });
        // console.log("User ID:", user_id);

        // Create a new submission
        const submission = await Subm.create({
            problem_name, code, verdict, problem_id, user_id,timeTaken,memoryUsed
        });

        // Log the created submission
        // console.log("Submission created:", submission);

    //  Return a successful response
        return res.status(201).json({ message: "Submission successful", submission });
    } catch (error) {
        console.error("Error creating submission:", error);
        
        // Return an error response
        return res.status(500).json({ errors: "Internal server error",error });
    }
};