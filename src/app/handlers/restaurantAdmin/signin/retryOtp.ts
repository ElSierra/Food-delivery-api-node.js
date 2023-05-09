import { Request, Response } from "express";
import { createAddOTP } from "../../../modules/auth/handleOTPForRestAdmin";
import { generateOTP } from "../../../modules/auth/generateOTP";
import prisma from "../../../../../lib/prisma/init";

export const retryOtp = async (req: Request, res: Response) => {
  const { email } = req.query as { email: string };
  try {
    const user = await prisma.restaurantAdmin.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      await createAddOTP(email, generateOTP());
     return res.status(200).json({ msg: "sent", date: res.sendDate });
    } else {
    return  res.status(400).json({ msg: "error" });
    }
  } catch (e) {
    return res.status(400).json({ msg: "error" });
  }
};
