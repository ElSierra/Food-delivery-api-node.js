import { Request, Response } from "express";
import prisma from "../../../../prisma/init";

export const orderFood = async (req: any, res: Response) => {
  console.log("here");
  const { menuId, restaurantId, quantity } = req.body;

  const menu = await prisma.menu.findUnique({
    where: {
      id: menuId,
    },
    select: {
      price: true,
    },
  });

  if (!menu) {
    return res.status(400).json({ msg: "Menu Error" });
  }
  const { id } = req.user;
  const newOrder = await prisma.orders.create({
    data: {
      restaurantId: restaurantId,
      userId: id,
      foodOrder: {
        create: [
          {
            menu: {
              connect: { id: menuId },
            },
            quantity,
          },
        ],
      },
      status: "PENDING",
      total: menu.price * quantity,
    },
    include: {
      foodOrder: true,
      restaurant: true,
      user: true,
    },
  });

  return res.status(200).json(newOrder);
};
