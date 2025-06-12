import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;

// Define your microservice targets here
export const services = {
  auth: process.env.AUTH_SERVICE_URL || 'http://localhost:4001',
  user: process.env.USER_SERVICE_URL || 'http://localhost:4002',
  // add more services as needed
  // just need to add here and start this service
};