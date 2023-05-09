import { restaurantAdminResponse } from "./../../../../../interface";
import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";

export const getRestaurantAdmin = async (req: any, res: Response) => {
  try {
    const user = await prisma.restaurantAdmin.findFirst({
      where: {
        email: req.user.email,
      },
      select: restaurantAdminResponse,
    });

    if (user) {
      res.status(200).json(user);
    }
    res.status(400).json({
      msg: "Your account is Probably banned or deleted",
    });
  } catch (e) {
    console.log(e);
  }
};
