import express from "express";
import auth from "../auth.js";
import { execute,  executeInp, getSub, getsubs, submit } from "../controller/submission.controller.js";

const router = express.Router();


router.post("/run",execute);
router.post("/run/input",executeInp)
router.get("/allsubs",auth,getsubs);
router.get("/getsub/:_id",auth,getSub)
router.post("/submit",submit)




export default router