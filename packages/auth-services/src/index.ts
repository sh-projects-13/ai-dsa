import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

// Environment Variables
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const app = express();
const PORT = process.env.AUTH_SERVICE_PORT || 4001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// Routes
import authRoutes from "./routes/auth.route";

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
