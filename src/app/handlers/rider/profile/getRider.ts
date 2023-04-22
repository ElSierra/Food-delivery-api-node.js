import { Response } from "express";
import prisma from "../../../../prisma/init";
import { riderResponse } from "../../../../../interface";

export const getRider = async (req: any, res: Response) => {
  console.log(req.user);
  try {
    const user = await prisma.rider.findFirst({
      where: {
        email: req.user.email,
      },
      select: riderResponse,
    });

    if (user) {
      res.status(200).json({
        user,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
