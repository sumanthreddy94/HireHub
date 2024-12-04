import express from "express";
import { employerGetAllApplications, jobSeekerDeleteApplication, jobSeekerGetAllApplications, postApplication } from "../controllers/applicationController.js"
import { isAuthorised } from "../middlewares/auth.js";
import upload from "../config/multerConfig.js";

const router = express.Router();
router.get("/jobseeker/getall", isAuthorised , jobSeekerGetAllApplications)
router.get("/employer/getall", isAuthorised , employerGetAllApplications)
router.delete("/delete/:id", isAuthorised , jobSeekerDeleteApplication)
// router.post("/post" , isAuthorised ,postApplication)
router.post('/post', isAuthorised, upload.single('resume'), postApplication);

export default router;
