import axios from "axios";

interface iVerificationEmailOtpData {
  email: String;
  otp: String;
}

// export const sendNewUserOtpEmail = async (
//   emailData: iVerificationEmailOtpData
// ) => {
//   await axios.post(`${process.env.QUEUE_SERVICE_URL}/api/v1/send-email`, {
//     title: "new-user-otp-email",
//     ...emailData,
//   });
// };

// export const sendForgotPasswordOtpEmail = async (
//   emailData: iVerificationEmailOtpData
// ) => {
//   await axios.post(`${process.env.QUEUE_SERVICE_URL}/api/v1/send-email`, {
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
