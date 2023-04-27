import { transporter } from "../../../../lib/transporter/transporterInit";
import { template } from "./emailTemplate";
import { resetTemplate } from "./resetTemplate";

export const sendPasswordReset = (
  link: string,
  website: string,
  email: string,
  name: string
) => {
  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: `Reset Password for ${email}`,
    html: resetTemplate(link, name),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("📧", error);
    } else {
      console.log("📧 Email sent: " + info.response);
    }
  });
};
