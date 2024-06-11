import fs from 'fs';
import path from 'path';
import Subm from '../models/submission.model.js';
import { v4 as uuid } from 'uuid';
import { exec } from "child_process";
import { fileURLToPath } from 'url';
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
        const output = await executeCpp(filePath);
        res.json({ filePath, output });
    } catch (error) {
        res.status(500).json({ error: error });
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
        exec(`g++ ${c} -o ${v} && cd controller && cd outputs && .\\${jobId}.exe `,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
               else  if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
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
          const output = await executeCppInp(filePath,inputPath);
        res.json({ filePath, output });
    } catch (error) {
        res.status(500).json(error);
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

    return new Promise((resolve, reject) => {

        exec(`g++ ${c} -o ${v} && cd controller\\outputs && ${jobId}.exe < ..\\inputs${inp}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
               else  if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
    // return inp
};

//  && cd controller && cd outputs && .\\${jobId}.exe <${inp}