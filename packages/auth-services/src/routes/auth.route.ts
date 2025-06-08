import { Router } from "express";
import { registerUnverifiedUser } from "../controllers/auth.controller";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

// Registration
router.route("/register").post(asyncHandler(registerUnverifiedUser));

export default router;
