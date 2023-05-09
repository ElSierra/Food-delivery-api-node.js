import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";

export const getRestaurantsSkip = async (req: Request, res: Response) => {
  try {
    const restaurant = await prisma.restaurant.findMany({
      include: {
        location: true,
        menu: true,
        //orders: true
      },
      skip: Number(req.query.start),
      take: Number(req.query.take),
    });
    if (restaurant) {
      return res.status(200).json({
        restaurant,
      });
    }
    return res.status(400).json({ msg: "bad request" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "bad request" });
  }
};
