import nodemailer from "nodemailer";
import { template } from "./emailTemplate";

export const sendEmail = (link: string, website: string, email: string, name : string) => {
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
    subject: `Verify your Email for ${website}`,
    html: template(link, name),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
    console.log("📧", error)
    
    } else {
      console.log("📧 Email sent: " + info.response);
    }
  });
  
};
