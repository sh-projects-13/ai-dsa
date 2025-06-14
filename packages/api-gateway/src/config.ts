import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.API_GATEWAY_PORT || 4000;

// Define your microservice targets here
export const services = {
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:4002",
    hello: process.env.HELLO_SERVICE_URL || "http://localhost:4001",
    Queue: process.env.QUEUE_SERVICE_URL || "http://localhost:4003",
    // add more services as needed
    // just need to add here and start this service
};
