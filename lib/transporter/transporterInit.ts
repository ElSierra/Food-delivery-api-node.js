import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,

  auth: {
    user: process.env.LOGIN_EMAIL,
    pass: process.env.LOGIN_PASSWORD,
  },
} as SMTPTransport.Options);
