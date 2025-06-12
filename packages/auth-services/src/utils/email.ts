import axios from "axios";
import { config } from "../conf/config";

interface iVerificationEmailOtpData {
  email: String;
  otp: String;
}

// export const sendNewUserOtpEmail = async (
//   emailData: iVerificationEmailOtpData
// ) => {
// await axios.post(`${config.queueServiceUrl}/api/v1/send-email`, {
//     title: "new-user-otp-email",
//     ...emailData,
//   });
// };

// export const sendForgotPasswordOtpEmail = async (
//   emailData: iVerificationEmailOtpData
// ) => {
// await axios.post(`${config.queueServiceUrl}/api/v1/send-email`, {
//     title: "forgot-password-otp-email",
//     ...emailData,
//   });
// };

export const sendNewUserOtpEmail = async (
  emailData: iVerificationEmailOtpData
) => {
  console.log(emailData);
};

export const sendForgotPasswordOtpEmail = async (
  emailData: iVerificationEmailOtpData
) => {
  console.log(emailData);
};
