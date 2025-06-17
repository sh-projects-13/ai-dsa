import nodemailer from "nodemailer";

interface MailOptions {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async ({ to, subject, html }: MailOptions) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: `<AI-DSA${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });
};
