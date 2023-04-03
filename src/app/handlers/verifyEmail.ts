import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/init";

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log("🚀 ~ file: verifyEmail.ts:6 ~ verifyEmail ~ token:", token);

  if (token) {
    if (process.env.SECRET) {
      try {
        const user = jwt.verify(token, process.env.SECRET) as { email: string };
        if (user) {
          try {
            const updatedUser = await prisma.user.update({
              where: {
                email: user.email,
              },
              data: {
                verified: true,
              },
            });
            const { password, ...userResponse } = updatedUser;
            return res.status(200).json(userResponse);
          } catch (e) {
            return res.status(400).json(e);
          }
        }
        return console.log(user);
      } catch (e) {
        console.log(e);
        return res.status(401).json({ msg: "internal server error" });
      }
    }
    throw new Error("No Secret Defined");
  }
};
