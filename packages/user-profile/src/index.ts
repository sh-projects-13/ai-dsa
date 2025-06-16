import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import handler from './middleware/index';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', userRoutes); // I have intentionally not mounted everything at /api/ something because this is already a backend service. change it to how you want ofc
app.use(handler);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`🚀 User Profile Server running on port ${PORT}`);
});
