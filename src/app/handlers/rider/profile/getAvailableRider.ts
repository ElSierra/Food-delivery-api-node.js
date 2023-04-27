import { Response } from "express";
import prisma from "../../../../../lib/prisma/init";

export const getAvailableRider = async (req: any, res: Response) => {
  //TODO : Check if rider is close to restaurant
  try {
    const rider = await prisma.rider.findMany({
      where: {
        available: true,
      },
    });
    res.status(200).json(rider);
  } catch (e) {
    res.status(400).json({ msg: "Bad request" });
  }
};
