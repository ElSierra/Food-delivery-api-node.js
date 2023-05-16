import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";

export const getUserMenu = async (req: Request, res: Response) => {
  const order = await prisma.orders.findMany({
    where: {
      userId: "645a312c3c112d829907b1c2",
    },
    include: {
      foodOrder: {
        select: {
          menu: true,
        },
      },
    },
  });
  return res.status(200).json({ order });
};
