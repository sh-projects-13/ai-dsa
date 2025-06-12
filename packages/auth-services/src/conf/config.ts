import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string, required = true): string {
  const value = process.env[key];
  if (required && (value === undefined || value === "")) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value!;
}

export const config = {
  port: parseInt(getEnv("AUTH_SERVICE_PORT")),
  databaseUrl: getEnv("DATABASE_URL"),
  corsOrigin: getEnv("CORS_ORIGIN"),
  arcjetKey: getEnv("ARCJET_KEY"),
  queueServiceUrl: getEnv("QUEUE_SERVICE_URL"),
  passwordSalt: parseInt(getEnv("PASSWORD_SALT")),
  accessTokenSecret: getEnv("ACCESS_TOKEN_SECRET"),
  accessTokenExpiry: parseInt(getEnv("ACCESS_TOKEN_EXPIRY")),
  refreshTokenSecret: getEnv("REFRESH_TOKEN_SECRET"),
  refreshTokenExpiry: parseInt(getEnv("REFRESH_TOKEN_EXPIRY")),
  encryptionKey: getEnv("OTP_ENCRYPTION_KEY"),
  encryptionIV: getEnv("OTP_ENCRYPTION_IV"),
  maxOtpRequestsPerDay: parseInt(getEnv("MAX_OTP_REQUESTS_PER_DAY")),
};

export type ConfigSchema = typeof config;
