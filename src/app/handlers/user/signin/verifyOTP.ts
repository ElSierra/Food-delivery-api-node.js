import { NextFunction, Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import { createJWT } from "../../../modules/auth/auth";
import { userResponse } from "../../../../../interface";

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.query as { email: string };
  const { otp } = req.body;
  console.log(otp);
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      console.log(user.OTP);
      if (user.OTP.toString() === otp) {
        const { password, OTP, ...userData } = user;

        const validatedUser = await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            OTP: 0,
            verified: true,
          },
          select: userResponse,
        });
        const token = { token: createJWT(user) };
        return res.status(200).json({ ...validatedUser, ...token });
      } else if (user.OTP === 1) {
        return res.status(401).json({ msg: "OTP Expired" });
      } else {
        return res.status(401).json({ msg: "Invalid OTP" });
      }
    }
    return res.status(401).json({ msg: "Invalid OTP" });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};
