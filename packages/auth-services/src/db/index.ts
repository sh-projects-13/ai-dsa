import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "../conf/config";

// console.log("Database url", config.databaseUrl);
// console.log("PORT", config.port);

const sql = neon(config.databaseUrl);
export const db = drizzle({ client: sql });
