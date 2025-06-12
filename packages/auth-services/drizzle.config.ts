import { defineConfig } from "drizzle-kit";
import { config } from "./src/conf/config";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.databaseUrl,
  },
});
