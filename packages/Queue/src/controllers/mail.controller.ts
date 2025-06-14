import { Request, RequestHandler, Response } from "express";
import {
    sendNewUserOtpToQueue,
    sendForgotPasswordOtpToQueue,
} from "../utils/Queue";
import { EmailJobData } from "../types/email";

export const enqueueMailJob = async (req: Request, res: Response) => {
    const { email, otp, title } = req.body as EmailJobData;

    if (!email || !otp || !title) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }

    try {
        if (title === "new-user-otp-email") {
            console.log("Enqueuing new user OTP email job:");
            await sendNewUserOtpToQueue({ email, otp, title });
            res.status(200).json({
                message: "OTP email job queued successfully",
            });
        } else if (title === "forgot-password-otp-email") {
            console.log("Enqueuing forgot password OTP email job:");
            await sendForgotPasswordOtpToQueue({ email, otp, title });
            res.status(200).json({
                message: "OTP email job queued successfully",
            });
        } else {
            res.status(400).json({ message: "Invalid title for email job" });
            return;
        }
    } catch (error) {
        console.error("Queue enqueue error:", error);
        res.status(500).json({ message: "Failed to enqueue job" });
    }
};
