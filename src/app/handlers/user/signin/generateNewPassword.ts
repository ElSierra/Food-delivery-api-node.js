import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { confirmationTemplate } from "../signup/confirmationTemplate";
import { generateStrongPassword } from "../../../modules/auth/generateStrongPassword";
import { AddPasswordToDB } from "../../../modules/auth/handlePasswordReset";


export const generateNewPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log("🚀 ~ file: verifyEmail.ts:6 ~ verifyEmail ~ token:", token);

  if (token) {
    if (process.env.SECRET) {
      try {
        const user = jwt.verify(token, process.env.SECRET) as { email: string };
        const newPassword = generateStrongPassword();
        if (user) {
          const updatedUser = await AddPasswordToDB(user.email, newPassword);
          if (updatedUser) {
            return res
              .status(200)
              .send(confirmationTemplate("Your New Password", newPassword));
          }
          return res
            .status(401)
            .send(confirmationTemplate("👎", "❌ Something went wrong"));
        }
        return res
          .status(401)
          .send(confirmationTemplate("👎", "❌ Something went wrong"));
      } catch (e) {
        console.log(e);
        return res
          .status(401)
          .send(confirmationTemplate("👎", "❌ Something went wrong"));
      }
    }
    throw new Error("No Secret Defined");
  }
};
