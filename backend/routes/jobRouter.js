import express from "express";
import { deleteJob, getAllJobs, getMyJobs, postJob, updateJob, getSingleJob } from "../controllers/jobController.js";
import { isAuthorised } from "../middlewares/auth.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.get("/getall", getAllJobs)
router.post("/post", isAuthorised ,upload.single('companyLogo') ,postJob)
router.get("/getmyjobs", isAuthorised ,getMyJobs)
router.put("/updatejobs/:id", isAuthorised ,updateJob)
router.delete("/delete/:id", isAuthorised ,deleteJob)
router.get("/:id", isAuthorised ,getSingleJob)


export default router;
