import { Worker, Job } from "bullmq";
import { redis } from "../config/redis";
import { sendOtpEmail } from "../utils/mailer";
import { newUserMail } from "../mails/newUserMail";
import { render } from "@react-email/render";
import { forgetPasswordMail } from "../mails/forgetPasswordMail";

// Define the worker for new-user-otp-email queue
const newUserWorker = new Worker(
    "new-user-otp-email",
    async (job: Job) => {
        const { email, otp } = job.data;

        const subject = "Your Registration OTP Code";
        const html = await render(newUserMail(otp));

        await sendOtpEmail({ to: email, subject, html });
        return { success: true, email, otp };
    },
    {
        connection: redis,
    }
);

const forgotPasswordWorker = new Worker(
    "forgot-password-otp-email",
    async (job: Job) => {
        const { email, otp } = job.data;

        const subject = "Your Forgot Password OTP";
        const html = await render(forgetPasswordMail(otp));

        await sendOtpEmail({ to: email, subject, html });
        return { success: true, email, otp };
    },
    {
        connection: redis,
    }
);
[newUserWorker, forgotPasswordWorker].forEach((worker) => {
    worker.on("completed", (job) => {
        console.log(`Worker removed job ${job.id}`);
    });
    worker.on("failed", (job, err) => {
        console.error(`Worker failed job ${job?.id}:`, err);
    });
});
