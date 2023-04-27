import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../../../../lib/prisma/init";
import { confirmationTemplate } from "./confirmationTemplate";

export const verifyEmailRider = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log("🚀 ~ file: verifyEmail.ts:6 ~ verifyEmail ~ token:", token);

  if (token) {
    if (process.env.SECRET) {
      try {
        const rider = jwt.verify(token, process.env.SECRET) as {
          email: string;
        };
        if (rider) {
          try {
            const newRider = await prisma.rider.findFirst({
              where: {
                email: rider.email,
              },
              select: {
                verified: true,
              },
            });
            if (newRider)
              if (newRider.verified === true) {
                return res
                  .status(200)
                  .send(
                    confirmationTemplate(
                      "👍",
                      "✅ Your Email is verified already"
                    )
                  );
              }
            const updatedRider = await prisma.rider.update({
              where: {
                email: rider.email,
              },
              data: {
                verified: true,
              },
            });
            if (updatedRider)
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
        return console.log(rider);
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
