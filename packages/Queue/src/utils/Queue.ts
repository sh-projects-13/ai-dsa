import { Queue } from "bullmq";
import { EmailJobData } from "../types/email";
import { redis } from "../config/redis";

export const newUserOtpQueue = new Queue<EmailJobData>("new-user-otp-email", {
    connection: redis,
});

export const forgotPasswordOtpQueue = new Queue<EmailJobData>(
    "forgot-password-otp-email",
    {
        connection: redis,
    }
);

export const sendNewUserOtpToQueue = async (data: EmailJobData) => {
    try {
        console.log("Adding new user OTP job to queue:", data);
        const job = await newUserOtpQueue.add("new-user-otp-job", data, {
            attempts: 3,
            backoff: { type: "exponential", delay: 3000 },
            removeOnComplete: true,
        });
    } catch (error) {
        console.error("Error adding new user OTP job to queue:", error);
        throw error;
    }
};

export const sendForgotPasswordOtpToQueue = async (data: EmailJobData) => {
    try {
        console.log("Adding forgot password OTP job to queue:", data);
        const job = await forgotPasswordOtpQueue.add(
            "forgot-password-otp-job",
            data,
            {
                attempts: 3,
                backoff: { type: "exponential", delay: 3000 },
                removeOnComplete: true,
            }
        );
    } catch (error) {
        console.error("Error adding forgot password OTP job to queue:", error);
        throw error;
    }
};
