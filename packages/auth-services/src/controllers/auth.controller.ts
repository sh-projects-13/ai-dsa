import { Request, RequestHandler, Response } from "express";
import {
  checkIfUnverifiedUserExistsService,
  checkIfUsernameisAvailibleService,
  checkIfVerifiedUserExistsService,
  getUnverifiedUserDataService,
  getVerifiedUserDataByEmailService,
  unverifiedUserRegisterService,
  verifiedUserRegistrationService,
} from "../services/auth.service";
import { hashData, verifyHashedData } from "../utils/hash";
import { randomInt } from "crypto";
import { decodeOtpId, encodeOtpId } from "../utils/otpEncryptor";
import jwt from "jsonwebtoken";
import { aj } from "../utils/arcjet";
import { generateAccessAndRefereshTokens } from "../utils/jwtTokens";
import { sendNewUserOtpEmail } from "../utils/email";

interface iRegisterUser {
  name: string;
  email: string;
  password: string;
  username: string;
}

interface iVerificationEmailOtpData {
  email: String;
  otp: String;
  otpUrl: String;
}

interface iUnverifiedUser {
  id: string;
  email: string;
  name: string;
  username: string;
  password_hash: string;
  otp_hash: string;
}

interface iLoginUser {
  id: string;
  email: string;
  name: string;
  username: string;
}

// Check if User Already Logged in
export const checkUserAlreadyLogin: RequestHandler = async (req, res) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  // console.log(token);
  if (!token) {
    res.status(302).json({ isLoggedIn: false, message: "User not logged in" });
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

  res.status(200).json({
    message: "User already logged in",
    user: decodedToken,
    isLoggedIn: true,
  });
};

// Check if Username is Available
export const checkUsernameAvailability: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { username } = req.body;
  // const username = req.body.username;

  if (!username) {
    res.status(400).json({ message: "Username is required." });
  }

  const isUsernameAvailable = await checkIfUsernameisAvailibleService(username);

  if (isUsernameAvailable) {
    res.status(200).json({ message: "Username is available." });
  } else {
    res.status(400).json({ message: "Username is not available." });
  }
};

// Check if email is valid
export const checkValidEmail: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required." });
  }

  const emailDecision = await aj.protect(req, { email });
  console.log(emailDecision);

  if (emailDecision) {
    res.status(200).json({ validEmail: true, message: "Email is valid." });
  } else {
    res.status(400).json({ validEmail: false, message: "Email is not valid." });
  }
};

// Register New Unverified User
export const registerUnverifiedUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { name, email, password, username }: iRegisterUser = req.body;

  if (!name || !email || !password || !username) {
    res.status(400).json({ message: "All fields are required." });
  }

  if (await checkIfVerifiedUserExistsService(email)) {
    res.status(400).json({ message: "User already exists." });
  }

  if (await checkIfUnverifiedUserExistsService(email)) {
    res
      .status(400)
      .json({ message: "Please check your email and verify yourself." });
  }

  const hashedPassword = await hashData(password);
  const otp = randomInt(100000, 999999).toString();
  const otp_hash = await hashData(otp);

  const newUnverifiedUser: iUnverifiedUser =
    await unverifiedUserRegisterService(
      email,
      name,
      username,
      hashedPassword,
      otp_hash
    );

  const otpUrl = encodeOtpId(newUnverifiedUser.id);

  const emailData: iVerificationEmailOtpData = {
    email,
    otp,
    otpUrl,
  };

  await sendNewUserOtpEmail(emailData);

  res.status(201).json(newUnverifiedUser);
};

// Verify and Register New Verified User
export const verifyOtpAndRegisterVerifiedUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { otpId } = req.params;
  if (!otpId) {
    res.status(404).json({ message: "Page not found" });
  }

  const { email, otp } = req.body;
  if (!email || !otp) {
    res.status(400).json({ message: "All fields are required." });
  }

  const decodedOtpId = decodeOtpId(otpId);

  const unverifiedUserData = await getUnverifiedUserDataService(decodedOtpId);
  if (unverifiedUserData.length === 0) {
    res.status(401).json({
      message: "Invalid request. Please make sure you are on the correct url.",
    });
  }

  const unverifiedUser = unverifiedUserData[0];

  if (unverifiedUser.email !== email) {
    res.status(400).json({ message: "Incorrect email." });
  }

  if (!(await verifyHashedData(otp, unverifiedUser.otp_hash))) {
    res.status(400).json({ message: "Incorrect OTP." });
  }

  await verifiedUserRegistrationService(
    unverifiedUser.email,
    unverifiedUser.name,
    unverifiedUser.username,
    unverifiedUser.password_hash
  );

  res.status(201).json({ message: "User registered successfully." });
};

// Login User
export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    res.status(400).json({ message: "All fields are required." });
  }

  const identifierIsEmail = identifier.includes("@");

  const user = identifierIsEmail
    ? await getVerifiedUserDataByEmailService(identifier)
    : await getVerifiedUserDataByEmailService(identifier);

  if (!user) {
    res.status(404).json({ message: "User not found." });
  }

  if (!(await verifyHashedData(password, user.password_hash))) {
    res.status(400).json({ message: "Incorrect password." });
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefereshTokens(user);

  const loggedInUser: iLoginUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  };

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: loggedInUser,
      message: "User logged In Successfully",
    });
};


// Request forgot password otp 
export const checkIfEmailExistsService: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const {email} = req.body;
  if(!email) return res.status(400).json({message:"Email required"});

  const{user} = await getVerifiedUserDataByEmailService(email);
  if(!user) return res.status(404).json({message:"User not exists"});

  const otp = randomInt(100000,999999).toString();
  const otp_hash  = await hashData(otp);

  const entry = await saveOtpInForgotPasswordTable(email,otp_hash);

  await sendForgotPasswordOtpEmail (email,otp);
  
  return res.status(200).json({message:"OTP sent to mail",id: entry.id});
};

// verify forgot password otp
export const verifyForgotPasswordOtp: RequestHandler = async (req, res) =>{
  const {id} = req.params;
  const {otp} = req.body;

  if (!otp || !id) {
    return res.status(400).json({ message: "OTP and ID required" });
  }

  const entry = await getForgotPasswordEntryById(id);
  if (!entry) {
    return res.status(404).json({ message: "Invalid OTP request" });
  }

  if (new Date(entry.expires_at) < new Date()) {
  return res.status(400).json({ message: "OTP has expired" });
  }

  const isValid = await verifyHashedData(otp, entry.otp_hash);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  return res.status(200).json({message:"OTP verified succesfully"});
 }

 // Reset password
export const resetForgotPassword: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || !id) {
    return res.status(400).json({ message: "Password and ID required" });
  }

  const entry = await getForgotPasswordEntryById(id);
  if (!entry) {
    return res.status(404).json({ message: "Invalid password reset request" });
  }

  const password_hash = await hashData(newPassword);
  await updateUserPasswordByEmail(entry.email, password_hash);

  await deleteForgotPasswordEntryById(id);

  return res.status(200).json({ message: "Password reset successfully" });
};
