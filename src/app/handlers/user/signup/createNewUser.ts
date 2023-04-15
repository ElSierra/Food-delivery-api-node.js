import { Request, Response } from "express";
import prisma from "../../../../prisma/init";
import {
  createEmailJWT,
  createHashedPassword,
  createJWT,
} from "../../../modules/auth/auth";
import { sendEmail } from "../../../modules/email/sendEmail";

const DEFAULT_EXPIRATION = 3600;

export const createNewUser = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        verified: false,
        email,
        password: await createHashedPassword(password),
        phone,
      },

      select: {
        name: true,
        email: true,
        verified: true,
        id: true,
        phone: true,
      },
    });

    if (user) {
      const token = createJWT(user);
      const url = req.protocol + "://" + req.get("host");
      //const ipAddress = req.socket.remoteAddress?.split(":")[3];
      const emailToken = createEmailJWT(user.email);
      const link = `${url}/verify/${emailToken}`;

      sendEmail(link, "Food APP", user.email, user.name);

      const userData: any = { ...user };
      userData.token = token;

      res.status(200).json(userData);
    }
  } catch (e: any) {
    console.log(e.meta);
    return res.status(400).json(e.meta);
  }
};
