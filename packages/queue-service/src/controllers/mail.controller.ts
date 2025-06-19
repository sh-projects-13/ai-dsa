import { Request, RequestHandler, Response } from "express";
import {
    sendNewUserOtpToQueue,
    sendForgotPasswordOtpToQueue,
    sendWelcomeEmailToQueue,
} from "../utils/Queue";
import { EmailJobData, WelcomeEmailData } from "../types/email";
export const enqueueForgotPasswordJob = async (req: Request, res: Response) => {
    const { email, otp } = req.body as EmailJobData;

    if (!email || !otp) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        console.log("Enqueuing forgot password OTP email job:");
        await sendForgotPasswordOtpToQueue({
            email,
            otp,
        });
        res.status(200).json({
            message: "Forgot password OTP email job queued successfully",
        });
    } catch (error) {
        console.error("Queue enqueue error:", error);
        res.status(500).json({ message: "Failed to enqueue job" });
    }
};

export const enqueueWelcomeEmailJob = async (req: Request, res: Response) => {
    const { email } = req.body as WelcomeEmailData;

    if (!email) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        console.log("Enqueuing welcome email job:");
        await sendWelcomeEmailToQueue({ email });
        res.status(200).json({
            message: "Welcome email job queued successfully",
        });
    } catch (error) {
        console.error("Queue enqueue error:", error);
        res.status(500).json({ message: "Failed to enqueue job" });
    }
};

export const enqueueNewUserOtpJob: RequestHandler = async (req, res) => {
    const { email, otp } = req.body as EmailJobData;

    if (!email || !otp) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        console.log("Enqueuing new user OTP email job:");
        await sendNewUserOtpToQueue({
            email,
            otp,
        });
        res.status(200).json({
            message: "New user OTP email job queued successfully",
        });
    } catch (error) {
        console.error("Queue enqueue error:", error);
        res.status(500).json({ message: "Failed to enqueue job" });
    }
};
