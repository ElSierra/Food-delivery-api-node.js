import { NextFunction, Request, Response } from "express";
import prisma from "../../../../prisma/init";
import { compareHashedPassword, createJWT } from "../../../modules/auth/auth";
import { createAddOTP } from "../../../modules/auth/handleOTP";
import { generateOTP } from "../../../modules/auth/generateOTP";


export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  console.log("🚀 ~ file: signInUser.ts:13 ~ email:", email);

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });


    if (user) {
      if (await compareHashedPassword(password, user.password)) {
        // const userData = {
        //   phone: user.phone,
        //   email: user.email,
        //   name: user.name,
        //   id: user.id,
        //   verified: user.verified,
        // };

        createAddOTP(user.email, generateOTP());
        res.status(200).json({ msg: "OTP Needed to Complete login" });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (e) {
    res.status(400).json({ e });
  }
};
