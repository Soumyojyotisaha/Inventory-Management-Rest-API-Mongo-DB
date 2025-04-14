require("dotenv").config();
const { otpStorage } = require("./otpStorage.js"); // Import OTP storage

const mailjet = require("node-mailjet").apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

/**
 * Send an email using Mailjet
 * @param {string} toEmail - Recipient's email
 * @param {string} subject - Email subject
 * @param {string} body - Email body content
 */
const sendEmail = async (toEmail, subject, body) => {
  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: "E-Commerce Team",
          },
          To: [
            {
              Email: toEmail,
              Name: "Customer",
            },
          ],
          Subject: subject,
          TextPart: body, // Plain text email body
          HTMLPart: `<p>${body.replace(/\n/g, "<br>")}</p>`, // Convert new lines to HTML
        },
      ],
    });

    console.log("Email sent successfully:", result.body);
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return false;
  }
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP Email using Mailjet
 * @param {string} toEmail - Recipient's email
 * @param {string} name - Recipient's name
 * @param {string} otp - The OTP to be sent
 */
const sendOTP = async (toEmail, name, otp) => {
  try {
    // ✅ Store OTP in otpStorage with lowercase email as key
    otpStorage[toEmail.toLowerCase()] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000, // 5 min expiry
    };

    console.log(`✅ Stored OTP for ${toEmail.toLowerCase()}:`, otpStorage[toEmail.toLowerCase()]);

    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_SENDER_EMAIL,
            Name: "E-Commerce Team",
          },
          To: [{ Email: toEmail, Name: name }],
          Subject: "Your OTP for Login",
          TextPart: `Hello ${name},\n\nYour OTP is: ${otp}.\nIt is valid for 5 minutes.`,
          HTMLPart: `<p>Hello <strong>${name}</strong>,</p><p>Your OTP is: <strong>${otp}</strong></p><p>It is valid for 5 minutes.</p>`,
        },
      ],
    });

    console.log("✅ OTP email sent successfully:", result.body);
    return true;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.message);
    return false;
  }
};
module.exports = { sendEmail, sendOTP, generateOTP };
