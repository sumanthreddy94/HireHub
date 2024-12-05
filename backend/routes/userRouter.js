import express from "express";
import { register, login, logout, getUser, getAllUsers, deleteUser, getDashboardStats } from "../controllers/userController.js"
import { isAuthorised } from "../middlewares/auth.js"

const router = express.Router();
router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthorised ,logout)
router.get("/getuser", isAuthorised ,getUser)
router.get("/getAllUsers", isAuthorised, getAllUsers)
router.delete("/delete/:email", isAuthorised, deleteUser)
router.get("/dashboard", isAuthorised, getDashboardStats)









export default router;
