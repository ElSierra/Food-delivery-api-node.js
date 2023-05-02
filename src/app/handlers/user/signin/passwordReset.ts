import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import { sendPasswordReset } from "../../../modules/email/sendPasswordReset";
import { createEmailJWT } from "../../../middleware/auth";

export const passwordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  const token = createEmailJWT(email);
  const link = `${process.env.WEBSITE_URL}/reset/${token}`;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      sendPasswordReset(link, "Food APP", user.email, user.name);
      return res.status(200).json({ msg: "check your email" });
    }
    return res.status(401).json({ msg: "Email is not registered" });
  } catch (e) {
    return res.status(401).json({ msg: "Invalid email" });
  }
};
