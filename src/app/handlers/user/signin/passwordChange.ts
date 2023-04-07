import { Response } from "express";
import prisma from "../../../../prisma/init";
import {
  compareHashedPassword,
  createHashedPassword,
} from "../../../modules/auth/auth";

export const passwordChange = async (req: any, res: Response) => {
  const { password, oldPassword } = req.body;
  const { email, id } = req.user;
  console.log({ email, password, oldPassword });

  try {
    if (password === oldPassword) {
      return res.status(401).json("You can't use the same password as before");
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      if (await compareHashedPassword(oldPassword, user.password)) {
        const updatedUser = await prisma.user.update({
          where: {
            email,
          },
          data: {
            password: await createHashedPassword(password),
          },
        });
        console.log(updatedUser);
        return res.status(200).json(updatedUser);
      }
      return res.status(401).json("incorrect password");
    }
    return res.status(401).json("unauthorized");
  } catch (e) {
    return res.status(401).json({ error: e });
  }
};
