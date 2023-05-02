import { NextFunction, Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import { compareHashedPassword, createJWT } from "../../../middleware/auth";
import { createAddOTP } from "../../../modules/auth/handleOTP";
import { generateOTP } from "../../../modules/auth/generateOTP";

export const SignInRider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  console.log("🚀 ~ file: signInrider.ts:13 ~ email:", email);

  try {
    const rider = await prisma.rider.findFirst({
      where: {
        email: email,
      },
    });

    if (rider) {
      if (await compareHashedPassword(password, rider.password)) {
        createAddOTP(rider.email, generateOTP());
        res
          .status(200)
          .json({ msg: "Check your email, expires in 10 minutes" });
      } else {
        console.log("incorrect");
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (e) {
    res.status(400).json({ e });
    console.log(e);
  }
};
