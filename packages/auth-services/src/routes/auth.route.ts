import { Router } from "express";
import {
  checkUserAlreadyLogin,
  checkUsernameAvailability,
  checkValidEmail,
  registerUnverifiedUser,
  verifyOtpAndRegisterVerifiedUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller";

import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

// Check if user is already logged in
router.get("/check-login", asyncHandler(checkUserAlreadyLogin));

// Check if username is available
router.post("/check-username", asyncHandler(checkUsernameAvailability));

// Check if email is valid (Arcjet)
router.post("/check-email", asyncHandler(checkValidEmail));

// Register unverified user (sends OTP to email)
router.post("/register", asyncHandler(registerUnverifiedUser));

// Verify OTP and register as a verified user
router.post("/verify/:otpId", asyncHandler(verifyOtpAndRegisterVerifiedUser));

// Login user
router.post("/login", asyncHandler(loginUser));

// Logout user
router.post("/logout", asyncHandler(logoutUser));

export default router;
