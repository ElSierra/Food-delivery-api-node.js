import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import { singleRestaurantResponse } from "../../../../../interface";

export const getSingleRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id,
      },
      select: singleRestaurantResponse,
    });

    return res.status(200).json(restaurant);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};
