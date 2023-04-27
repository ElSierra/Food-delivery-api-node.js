import { otpTemplate } from "./otpTemplate";
import { transporter } from "../../../../lib/transporter/transporterInit";

export const sendOTP = (
  otp: number,
  website: string,
  email: string,
  name: string
) => {
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
