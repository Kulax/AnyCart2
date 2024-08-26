import express from 'express';
import {registerController,loginController,testController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
// router object as routing being done in seperate file
const router = express.Router();

// routing
// REGISTER || METHOD:POST
router.post("/register", registerController);

// LOGIN || POST(New Route)
router.post("/login", loginController);

// Test Routes
router.get("/test", requireSignIn,isAdmin, testController);

export default router;