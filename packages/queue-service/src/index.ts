import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json());

import emailRoutes from "./routes/email.route";
app.use("/sendemail", emailRoutes);
// app.use("/forget-password", emailRoutes);
// app.use("/welcome-mail", emailRoutes);

// app.get("/", (req, res) => {
//     res.send("Email microservice is running ✅");
// });

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
