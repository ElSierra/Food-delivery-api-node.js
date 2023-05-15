import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";

export const orderFood = async (req: any, res: Response) => {
  console.log("here");
  const { menuList, restaurantId } = req.body;
  console.log("🚀 ~ file: orderFood.ts:75 ~ orderFood ~ menuId:", menuList);
  try {
    const menuArray = [];

    for (let i in menuList) {
      const menu = prisma.menu.findFirst({
        where: {
          id: menuList[i].id,
          restaurantId,
        },
        select: {
          price: true,
        },
      });
      menuArray.push(menu);
    }

    const arrayMenu = await Promise.all(menuArray);
    console.log(
      "🚀 ~ file: orderFood.ts:94 ~ orderFood ~ arrayMenu:",
      arrayMenu
    );

    if (!arrayMenu || arrayMenu.length < 1) {
      return res.status(400).json({ msg: "Menu Error" });
    }

    let totalAmount = 0;

    if (arrayMenu.length > 0) {
      for (let i in arrayMenu) {
        totalAmount += arrayMenu[i]?.price || 0;
      }
    }

    const menuCreateList = [];

    for (let i in menuList) {
      const menu = {
        menu: {
          connect: { id: menuList[i].id },
        },
        quantity: menuList[i].quantity,
      };

      menuCreateList.push(menu);
    }

    const newOrder = await prisma.orders.create({
      data: {
        restaurantId: restaurantId,
        userId: req.user.id,
        foodOrder: {
          create: menuCreateList,
        },
        status: "PENDING",
        total: totalAmount,
      },
      include: {
        foodOrder: true,
      },
    });
    return res.status(200).json({ msg: "success", data: newOrder });
  } catch (e) {
    return res.status(400).json({ msg: "Menu Error", error: e });
  }
};
