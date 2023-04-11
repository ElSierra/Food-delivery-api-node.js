import { Request, Response } from "express";
import prisma from "../../../../prisma/init";
import { userResponse } from "../../../../interface";

export const getUser = async (req: any, res: Response) => {
  console.log(req.user);
  try {
  const user = await prisma.user.findFirst({
    where: {
      email: req.user.email,
    },
    select: userResponse,
  });

  if (user) {
    res.status(200).json({
      user,
    });
  }}catch(e){
    console.log(e);
  }
};
