import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.API_GATEWAY_PORT || 4000;

// Define your microservice targets here
export const services = {
    hello: process.env.HELLO_SERVICE_URL || "http://localhost:4001",
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:4002",
    queue: process.env.QUEUE_SERVICE_URL || "http://localhost:4003",
    user: process.env.USER_SERVICE_URL || "http://localhost:4004",
    // add more services as needed
    // just need to add here and start this service
};
