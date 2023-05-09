import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../../../../lib/prisma/init";
import { confirmationTemplate } from "./confirmationTemplate";

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log("🚀 ~ file: verifyEmail.ts:6 ~ verifyEmail ~ token:", token);

  if (token) {
    if (process.env.SECRET) {
      try {
        const user = jwt.verify(token, process.env.SECRET) as { email: string };
        if (user) {
          try {
            const newUser = await prisma.user.findFirst({
              where: {
                email: user.email,
              },
              select: {
                verified: true,
              },
            });
            if (newUser)
              if (newUser.verified === true) {
                return res
                  .status(200)
                  .send(
                    confirmationTemplate(
                      "👍",
                      "✅ Your Email is verified already"
                    )
                  );
              }
            const updatedUser = await prisma.user.update({
              where: {
                email: user.email,
              },
              data: {
                verified: true,
              },
            });
            if (updatedUser)
              return res
                .status(200)
                .send(
                  confirmationTemplate(
                    "👍",
                    "✅ Thank you for verifying your email address"
                  )
                );
          } catch (e) {
            return res.status(400).json(e);
          }
        }
        return console.log(user);
      } catch (e) {
        console.log(e);
        return res
          .status(401)
          .send(confirmationTemplate("👎", "❌ Something went wrong"));
      }
    }
    throw new Error("No Secret Defined");
  }
};
