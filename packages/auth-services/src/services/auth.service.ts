import { eq } from "drizzle-orm";
import { db } from "../db";
import { unverifiedUsers, users } from "../db/schema";

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
