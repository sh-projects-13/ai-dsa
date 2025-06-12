// v2

import { and, eq, sql } from "drizzle-orm";
import { db } from "../db";
import { rate_limits, max_request_reached } from "../db/schema";

// Add user to rate limit table
export const addUserToOtpRequestRateLimitService = async (email: string) => {
  await db
    .insert(rate_limits)
    .values({ email, count: 1, last_requested_at: new Date() }); // JS Date (UTC-safe)
};

// Return last otp request date
export const getUserRateLimitDateService = async (email: string) => {
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
export const resetUserOtpRequestRateLimitService = async (email: string) => {
  await db
    .update(rate_limits)
    .set({
      count: 1,
      last_requested_at: new Date(), // JS Date (UTC-safe)
    })
    .where(eq(rate_limits.email, email));
};

// Add user to restrict further otp requests for the day
export const restrictUserOtpRequestRateLimitService = async (email: string) => {
  await db.insert(max_request_reached).values({ email });
};

// Check if user is restricted from further otp requests for the day
export const checkIfUserOtpRequestIsRestrictedService = async (
  email: string,
  date: Date
) => {
  const max_request_reached_data = await db
    .select()
    .from(max_request_reached)
    .where(
      and(
        eq(max_request_reached.email, email),
        eq(max_request_reached.date_of_restriction, date)
      )
    );
  return max_request_reached_data.length > 0;
};
