import { Request, Response } from "express";
import prisma from "../../../../prisma/init";
import {
  createEmailJWT,
  createHashedPassword,
  createJWT,
} from "../../../modules/auth/auth";
import { sendEmail } from "../../../modules/email/sendEmail";

const DEFAULT_EXPIRATION = 3600;

export const createNewRider = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return res
        .status(400)
        .json({
          msg: "a user cannot be a rider too, delete your user account",
        });
    }
    const rider = await prisma.rider.create({
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

    if (rider) {
      const token = createJWT(rider);
      const url = req.protocol + "://" + req.get("host");
      //const ipAddress = req.socket.remoteAddress?.split(":")[3];
      const emailToken = createEmailJWT(rider.email);
      const link = `${url}/verify/${emailToken}`;

      sendEmail(link, "Food APP", rider.email, rider.name);

      const riderData: any = { ...rider };
      riderData.token = token;

      res.status(200).json(riderData);
    }
  } catch (e: any) {
    console.log(e);

    return res.status(400).json(e.meta);
  }
};
