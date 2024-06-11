import express from "express";

import auth from "../auth.js";
import { createProblem, deleteProblem, getProblem, getProblems, updateProblem } from "../controller/problem.controller.js";

const router = express.Router();

router.get('/',auth,getProblems)
router.post('/create',auth,createProblem);
router.put('/update/:_id',auth,updateProblem);
router.delete('/delete/:_id', deleteProblem);
router.get('/getproblem/:_id',auth, getProblem);

// router.post('/run',verifyJWT,execute)
export default router