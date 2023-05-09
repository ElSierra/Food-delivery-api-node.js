import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import slugify from "slugify";
import { getPlaiceholder } from "plaiceholder";

export const createRestaurant = async (req: any, res: Response) => {
  const { email, id } = req.user;
  const { name, location, address, category } = req.body;
  const [latitude, longitude] = location.split(",");
  console.log("reached here");

  try {
    const loadImage = (await getPlaiceholder(req.file.location)).base64;
    const restaurant = await prisma.restaurant.create({
      data: {
        name: name,
        photo: req.file.location,
        slug: slugify(name),
        loadingImage: loadImage,
        category: {
          create: {
            type: category,
          },
        },
        location: {
          create: {
            latitude: latitude,
            longitude: longitude,
            address: address,
          },
        },
        RestaurantAdmin: {
          connect: {
            id,
          },
        },
      },
    });
    if (restaurant) {
      return res.status(200).json(restaurant);
    } else {
      return res.status(400).json({ error: "restaurant error" });
    }
  } catch (e: any) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
};
