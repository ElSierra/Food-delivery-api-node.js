import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import { sendPasswordReset } from "../../../modules/email/sendPasswordReset";
import { createEmailJWT } from "../../../middleware/auth";

export const passwordResetRider = async (req: Request, res: Response) => {
  const { email } = req.body;
  const token = createEmailJWT(email);
  const link = `${process.env.WEBSITE_URL}/reset/${token}`;
  try {
    const rider = await prisma.rider.findFirst({
      where: {
        email,
      },
    });

    if (rider) {
      sendPasswordReset(link, "Food APP", rider.email, rider.name);
      return res.status(200).json({ msg: "check your email" });
    }
  } catch (e) {
    return res.status(401).json({ msg: "Invalid email" });
  }
};
