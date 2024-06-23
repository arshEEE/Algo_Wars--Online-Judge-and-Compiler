import express, { urlencoded } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors";
const app=express();
import cookieParser from "cookie-parser"
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

dotenv.config();
import userRoute from "./route/user.route.js"
import problemRoute from "./route/problem.route.js"
import subRoute from "./route/submission.route.js"
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT;
const URL = process.env.URL;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


try{
    await mongoose.connect(URL);
    console.log("DB connection established");
} catch (error){
    console.log("Error while connecting to MongoDB",error);
}

//defining routes
app.use("/user",userRoute)
app.use("/problem",problemRoute)
app.use("/sub",subRoute)

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})