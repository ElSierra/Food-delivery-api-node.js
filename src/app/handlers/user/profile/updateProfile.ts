import { Response } from "express";
import prisma from "../../../../../lib/prisma/init";

export const updateProfileInfo = async (req: any, res: Response) => {
  const { name, phone } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name: name ? name : undefined,
        phone: phone ? phone : undefined,
      },
    });
    if (user) {
      return res.status(200).json({ msg: "updated successfully" });
    }
    return res.status(400).json({ msg: "Not updated" });
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
};
