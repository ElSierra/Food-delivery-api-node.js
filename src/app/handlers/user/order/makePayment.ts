import { Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import { userResponse } from "../../../../../interface";

export const makePayment = async (req: any, res: Response) => {
  const { id } = req.user;
  const { amount, orderId } = req.body;
  console.log(id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        orders: true,
        balance: true,
      },
    });
    console.log({ user });
    if (user) {
      const balance = user?.balance;
      console.log(
        "🚀 ~ file: makePayment.ts:22 ~ makePayment ~ balance:",
        balance
      );
      if (balance >= Number(amount)) {
        console.log("here");
        const updatedOrder = await prisma.orders.update({
          where: {
            id: orderId,
          },
          data: {
            status: "PAID",
          },
          include: {
            foodOrder: true,
            restaurant: true,
            user: true,
            rider: true,
          },
        });

        if (updatedOrder) {
          const updatedUser = await prisma.user.update({
            where: {
              id,
            },
            data: {
              balance: Number(balance) - Number(amount),
            },
            select: userResponse,
          });

          return res.status(200).json(updatedUser);
        }
        return res.status(400).json({ msg: "Error" });
      } else {
        return res
          .status(400)
          .json({ msg: "Not enough balance, deposit and try again" });
      }
    }
    return res.status(400).json({ msg: "user does not exist" });
  } catch (e: any) {
    const error = new Error(e);
    return res.status(400).json({ msg: error.message });
  }
};
