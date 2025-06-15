import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import { config } from "./conf/config";

const app = express();
const PORT = config.port || 4001;

app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
import authRoutes from "./routes/auth.route";

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
