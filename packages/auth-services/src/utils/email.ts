import axios from "axios";

interface iVerificationEmailOtpData {
  email: String;
  otp: String;
}

export const sendOtpEmail = async (emailData: iVerificationEmailOtpData) => {
  await axios.post(`${process.env.QUEUE_SERVICE_URL}/api/v1/send-email`, {
    title: "otp-email",
    ...emailData,
  });
};
