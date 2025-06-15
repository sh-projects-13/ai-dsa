import Redis, { RedisOptions } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    connectTimeout: 10000, // 10 seconds
});
redis
    .ping()
    .then((res) => console.log("Redis connected:", res))
    .catch((err) => console.error("Redis failed:", err));
