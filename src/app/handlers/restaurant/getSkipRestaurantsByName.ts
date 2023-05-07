import { Request, Response } from "express";
import prisma from "../../../../lib/prisma/init";

export const getSkipRestaurantsByName = async (req: Request, res: Response) => {
  const { name, start, take } = req.query;
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        location: true,
        menu: true,
      },
      skip: Number(start),
      take: Number(take),

      where: {
        name: {
          contains: name?.toString() || "",
          mode: "insensitive",
        },
      },
    });

    if (restaurants) {
      return res.status(200).json({
        restaurants,
      });
    }
    return res.status(400).json({ msg: "Restaurant doesn't exist" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "bad request" });
  }
};
