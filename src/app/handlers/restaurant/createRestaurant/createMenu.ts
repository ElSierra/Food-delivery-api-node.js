import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import { getPlaiceholder } from "plaiceholder";

export const createMenu = async (req: any, res: Response) => {
  try {
    const { restaurant } = req.query;
    const { name, price } = req.body;

    const restaurantData = await prisma.restaurant.findFirst({
      where: {
        restaurantAdminId: req.user.id,
        id: restaurant,
      },
    });

    if (restaurantData) {
      const loadImage = (await getPlaiceholder(req.file.location)).base64;
      const menu = await prisma.menu.create({
        data: {
          name,
          photo: req.file.location,
          price: parseFloat(price),
          loadingImage: loadImage,
          restaurant: {
            connect: {
              id: restaurant,
            },
          },
        },
      });

      return res.status(200).json({ msg: menu });
    }
    return res.status(400).json({ msg: "You can't do that" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "Bad Request", error: e });
  }
};
