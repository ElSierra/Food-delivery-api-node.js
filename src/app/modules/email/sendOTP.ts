import nodemailer from "nodemailer";
import { otpTemplate } from "./otpTemplate";

export const sendOTP = (
  otp: number,
  website: string,
  email: string,
  name: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: `OTP For ${website}`,
    html: otpTemplate(otp.toString(), name, email),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("📧", error);
    } else {
      console.log("📧 Email sent: " + info.response);
    }
  });
};
