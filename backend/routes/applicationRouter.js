import express from "express";
import {
  employerGetAllApplications,
  jobSeekerDeleteApplication,
  jobSeekerGetAllApplications,
  postApplication,
  filterApplications,
  rejectApplication, // Ensure this is implemented in your controller
  moveToNextRound,   // Ensure this is implemented in your controller
  hireApplication,   // Add this for hiring functionality
} from "../controllers/applicationController.js";
import { isAuthorised } from "../middlewares/auth.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

// Routes

router.get("/jobseeker/getall", isAuthorised, jobSeekerGetAllApplications);
router.get("/employer/getall", isAuthorised, employerGetAllApplications);
router.delete("/delete/:id", isAuthorised, jobSeekerDeleteApplication);
router.post("/post", isAuthorised, upload.single("resume"), postApplication);

// Action routes
router.get("/filter", isAuthorised, filterApplications);
router.put("/reject/:id", isAuthorised, rejectApplication); // Reject application
router.put("/next-round/:id", isAuthorised, moveToNextRound); // Move application to next round
router.put("/hire/:id", isAuthorised, hireApplication); // Mark as hired



export default router;
