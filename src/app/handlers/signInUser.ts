import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/init";
import { compareHashedPassword, createJWT } from "../modules/auth";

export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      if (await compareHashedPassword(password, user.password)) {
        const userData = {
          phone: user.phone,
          email: user.email,
          name: user.name,
          id: user.id
        };
        const token = { token: createJWT(user) };
        res.status(200).json({ ...userData, ...token });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (e) {
    res.status(400).json({ e });
  }
};
