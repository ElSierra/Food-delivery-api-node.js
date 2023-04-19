import { Request, Response } from "express";
import prisma from "../../../prisma/init";

export const getRestaurantsAll = async (req: Request, res: Response) => {
  try {
    const restaurant = await prisma.restaurant.findMany({
      include: {
        location: true,
        menu: true,
        //orders: true
      },
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
