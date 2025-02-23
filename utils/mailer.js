const nodemailer = require("nodemailer");
const sendinblueTransport = require("nodemailer-sendinblue-transport");
require("dotenv").config(); // Load environment variables

const transporter = nodemailer.createTransport(
  new sendinblueTransport({
    apiKey: process.env.BREVO_API_KEY, // Use the API key from the .env file
  })
);

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: "soumyojyoti.saha2021@vitstudent.ac.in", // Sender's email address (should be a verified Brevo email)
      to,
      subject,
      text,
    });
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

module.exports = sendEmail;
