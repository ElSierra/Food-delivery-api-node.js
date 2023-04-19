import { NextFunction, Request, Response } from "express";
import prisma from "../../../../prisma/init";
import { createJWT } from "../../../modules/auth/auth";
import { riderResponse } from "../../../../interface";


export const verifyOTPRider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.query as { email: string };
  const { otp } = req.body;
  console.log(otp);
  try {
    const rider = await prisma.rider.findFirst({
      where: {
        email: email,
      },
    });

    if (rider) {
      console.log(rider.OTP);
      if (rider.OTP.toString() === otp) {
        const { password, OTP, ...riderData } = rider;

       const validatedRider = await prisma.rider.update({
          where: {
            email: rider.email,
          },
          data: {
            OTP: 0,
            verified: true
          },
          select: riderResponse
        });
        const token = { token: createJWT(rider) };
        return res.status(200).json({ ...validatedRider, ...token });
      } else if (rider.OTP === 1) {
        return res.status(401).json({ msg: "OTP Expired" });
      }
      else {
        return res.status(401).json({ msg: "Invalid OTP" });
      }
    }
    return res.status(401).json({ msg: "Invalid OTP" });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
};
