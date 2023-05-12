import { NextFunction, Response } from "express";
import prisma from "../../../../../lib/prisma/init";

export const checkIfUserLikedMiddleWare = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { restaurant } = req.query;
  const { id } = req.user;
  let foundError;
  let [foundDisLike, foundLike] = await Promise.all([
    prisma.disLike.findFirst({
      where: {
        userId: id,
        restaurantId: restaurant,
      },
    }),
    prisma.like.findFirst({
      where: {
        userId: id,
        restaurantId: restaurant,
      },
    }),
  ]);
  if (foundDisLike || foundLike) {
    return res.status(400).json({ msg: "You cant do that" });
  } else {
    next();
  }
};

export const likeRestaurants = async (req: any, res: Response) => {
  const { restaurant } = req.query;
  const { id } = req.user;
  console.log("like");
  try {
    const rest = await prisma.restaurant.update({
      where: {
        id: restaurant,
      },
      select: {
        dislike: true,
        like: true,
      },
      data: {
        like: {
          create: {
            userId: id,
          },
        },
      },
    });
    if (rest) {
      const total =
        (rest.like.length / (rest.dislike.length + rest.like.length)) * 100;

      await prisma.restaurant.update({
        where: {
          id: restaurant,
        },
        data: {
          rating: total.toFixed().toString(),
        },
      });
      return res.status(200).json({ msg: total });
    }
    return res.status(400).json({ msg: "bad request" });
  } catch (e: any) {
    console.log(e);
    return res.status(400).json(e);
  }
};

export const disLikeRestaurants = async (req: any, res: Response) => {
  const { restaurant } = req.query;
  const { id } = req.user;
  console.log("dislike");
  try {
    const rest = await prisma.restaurant.update({
      where: {
        id: restaurant,
      },
      select: {
        dislike: true,
        like: true,
      },
      data: {
        dislike: {
          create: {
            userId: id,
          },
        },
      },
    });

    if (rest) {
      console.log({ like: rest.like.length, dislike: rest.dislike.length });
      const total =
        (rest.like.length / (rest.dislike.length + rest.like.length)) * 100;

    const restRated =  await prisma.restaurant.update({
        where: {
          id: restaurant,
        },
        data: {
          rating: total.toPrecision(3).toString(),
          ratingAmount: (rest.dislike.length + rest.like.length).toString(),
        },
      });
      return res.status(200).json({ msg: restRated.rating, rA: restRated.ratingAmount });
    }
    return res.status(400).json({ msg: "bad request" });
  } catch (e: any) {
    console.log(e);
    return res.status(400).json(e);
  }
};
