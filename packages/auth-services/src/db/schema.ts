import {
  pgTable,
  varchar,
  timestamp,
  integer,
  uuid,
} from "drizzle-orm/pg-core";

// Unverified Users table
export const unverifiedUsers = pgTable("unverified-users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  otp_hash: varchar("password_hash", { length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Verified Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  refreshToken: varchar("refreshToken", { length: 255 }).notNull().default(""),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// Rate limiting table
export const rate_limits = pgTable("rate_limits", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }),
  count: integer("count").notNull().default(0),
  last_requested_at: timestamp("last_requested_at").notNull().defaultNow(),
});

// Maximum request count reached user table
export const max_request_reached = pgTable("max_request_reached", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  date_of_restriction: timestamp("date_of_restriction").notNull().defaultNow(),
});

// forgot password table
export const forgot_password = pgTable("forgot_password", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email",{ length: 255}).notNull(),
  otp_hash: varchar("otp_hash", {length: 255}).notNull(),
  password_hash: varchar("password_hash", { length: 255}),
  created_at: timestamp("created_at").notNull().defaultNow(),
  expires_at: timestamp("expires_at").notNull(),
});