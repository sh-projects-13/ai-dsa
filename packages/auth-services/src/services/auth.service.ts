import { eq } from "drizzle-orm";
import { db } from "../db";
<<<<<<< HEAD
import { unverifiedUsers, users } from "../db/schema";
=======
import {
  unverifiedUsers,
  users,
  rate_limits,
  max_request_reached,
  forgot_password,
} from "../db/schema";
>>>>>>> forgot_pasword

// Unverified User Registration into the DB
export const unverifiedUserRegisterService = async (
  email: string,
  name: string,
  username: string,
  passwordHash: string,
  otpHash: string
) => {
  const newUnverifiedUser = await db
    .insert(unverifiedUsers)
    .values({
      email,
      name,
      username,
      password_hash: passwordHash,
      otp_hash: otpHash,
    })
    .returning();
  return newUnverifiedUser[0];
};

// Verified User Registration into the DB
export const verifiedUserRegistrationService = async (
  email: string,
  name: string,
  username: string,
  passwordHash: string
) => {
  const newVerifiedUser = await db
    .insert(users)
    .values({
      email,
      name,
      username,
      password_hash: passwordHash,
    })
    .returning();
  return newVerifiedUser[0];
};

// Delete Unverified user
export const deleteUnverifiedUserService = async (id: string) => {
  await db.delete(unverifiedUsers).where(eq(unverifiedUsers.id, id));
};

// Check if username exists in the database
export const checkIfUsernameisAvailibleService = async (username: string) => {
  const existingUnverifiedUsers = await db
    .select()
    .from(unverifiedUsers)
    .where(eq(unverifiedUsers.username, username));
  const existingUsers = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return existingUsers.length === 0 && existingUnverifiedUsers.length === 0;
};

// Check if user exists as unverified user
export const checkIfUnverifiedUserExistsService = async (email: string) => {
  const existingUnverifiedUsers = await db
    .select()
    .from(unverifiedUsers)
    .where(eq(unverifiedUsers.email, email));
  return existingUnverifiedUsers.length > 0;
};

// Check if verified user exists
export const checkIfVerifiedUserExistsService = async (email: string) => {
  const existingVerifiedUsers = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  return existingVerifiedUsers.length > 0;
};

// Get unverified user data
export const getUnverifiedUserDataService = async (id: string) => {
  const unverified_user_data = await db
    .select()
    .from(unverifiedUsers)
    .where(eq(unverifiedUsers.id, id));
  return unverified_user_data;
};

// Get verified user data by email
export const getVerifiedUserDataByEmailService = async (email: string) => {
  const verified_user_data = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  return verified_user_data[0];
};

// Get verified user data by username
export const getVerifiedUserDataByUsernameService = async (
  username: string
) => {
  const verified_user_data = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return verified_user_data[0];
};

// Update refresh token
export const updateRefreshandAccessTokenService = async (
  id: string,
  token: string
) => {
  await db.update(users).set({ refreshToken: token }).where(eq(users.id, id));
};

// Delete refresh token
export const deleteRefreshTokenService = async (id: string) => {
  await db.update(users).set({ refreshToken: "" }).where(eq(users.id, id));
};

// save otp in forgot password table
export const saveOtpInForgotPasswordTable = async (
  email: string,
  otp_hash: string
) => {
  const entry = await db
    .insert(forgot_password)
    .values({
      email,
      otp_hash,
      expires_at: new Date(Date.now() + 15 * 60 * 1000),
    })
    .returning();
  return entry[0];
};

// get forgot password by entry
export const getForgotPasswordEntryById = async (id: string) => {
  const entry = await db
    .select()
    .from(forgot_password)
    .where(eq(forgot_password.id, id));
  return entry[0];
};

// update password in user table
export const updateUserPasswordByEmail = async (
  email: string,
  password_hash: string
) => {
  await db
    .update(users)
    .set({ password_hash })
    .where(eq(users.email, email));
};

// delete entry in forgot password table by id
export const deleteForgotPasswordEntryById = async (id: string) => {
  await db
    .delete(forgot_password)
    .where(eq(forgot_password.id, id));
};

