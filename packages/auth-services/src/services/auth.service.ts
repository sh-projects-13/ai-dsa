import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import {
  unverifiedUsers,
  users,
  rate_limits,
  max_request_reached,
} from "../db/schema";

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

// Check if username exists in the database
export const checkIfUsernameisAvailibleService = async (username: string) => {
  const existingUsers = await db
    .select()
    .from(unverifiedUsers)
    .where(eq(unverifiedUsers.username, username));
  return existingUsers.length === 0;
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
  return existingVerifiedUsers.length === 0;
};

// Return last otp request date
export const getLastUserRateLimitDateService = async (email: string) => {
  const rate_limits_data = await db
    .select()
    .from(rate_limits)
    .where(eq(rate_limits.email, email));
  return rate_limits_data[0].last_requested_at;
};

// Increment user otp request count and return total request count
export const incrementUserRateLimitService = async (email: string) => {
  const rate_limits_data = await db
    .update(rate_limits)
    .set({
      count: sql`${rate_limits.count} + 1`,
      last_requested_at: new Date(), // JS Date (UTC-safe)
    })
    .where(eq(rate_limits.email, email))
    .returning();
  return rate_limits_data[0].count;
};

// Reset user otp request count
export const resetUserRateLimitService = async (email: string) => {
  await db
    .update(rate_limits)
    .set({
      count: 1,
      last_requested_at: new Date(), // JS Date (UTC-safe)
    })
    .where(eq(rate_limits.email, email));
};

// Add user to restrict further otp requests for the day
export const restrictUserRateLimitService = async (email: string) => {
  await db.insert(max_request_reached).values({ email });
};

// Check if user is restricted from further otp requests for the day
export const checkIfUserIsRestrictedService = async (email: string) => {
  const max_request_reached_data = await db
    .select()
    .from(max_request_reached)
    .where(eq(max_request_reached.email, email));
  return max_request_reached_data.length > 0;
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
