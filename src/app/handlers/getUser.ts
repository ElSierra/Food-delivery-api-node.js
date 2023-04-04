import { Request, Response } from "express";
import prisma from "../../prisma/init";

export const getUser = async (req: any, res: Response) => {
  console.log(req.user);
  const user = await prisma.user.findFirst({
    where: {
      email: req.user.email,
    },
    select: {
      id: true,
      email: true,
      verified: true,
      phone: true,
      OTP: true,
    },
  });

  if (user) {
    res.status(200).json({
      user,
    });
  }
  
};
