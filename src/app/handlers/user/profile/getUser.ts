import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import { userResponse } from "../../../../../interface";

export const getUser = async (req: any, res: Response) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
      select: userResponse,
    });

    if (user) {
      return res.status(200).json({
        user,
      });
    }
    return res.status(400).json({
      msg: "Your account is Probably banned or deleted",
    });
  } catch (e) {
    console.log(e);
  }
};
