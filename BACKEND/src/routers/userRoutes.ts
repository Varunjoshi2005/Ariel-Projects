import { Router } from "express";
import userController from "../controllers/userController";
import { upload } from "../config";

const router = Router();


router.post("/register" , upload.single("profileImage") ,(req, res, next) => { userController.handleRegister(req, res, next) });
router.post("/login", (req, res, next) => { userController.handleLogin(req, res, next) });

export default router;