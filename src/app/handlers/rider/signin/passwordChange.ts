import { Request, Response } from "express";
import prisma from "../../../../prisma/init";
import {
  compareHashedPassword,
  createHashedPassword,
} from "../../../modules/auth/auth";
import { AuthenticatedRequest } from "../../../../interface";

const passwordChange = async (req: any, res: Response) => {
  const { password, oldPassword } = req.body;
  const { email, id } = req.rider;
  console.log({ email, password, oldPassword });

  try {
    if (password === oldPassword) {
      return res.status(401).json("You can't use the same password as before");
    }
    const rider = await prisma.rider.findUnique({
      where: {
        id,
      },
    });

    if (rider) {
      if (await compareHashedPassword(oldPassword, rider.password)) {
        const updatedRider = await prisma.rider.update({
          where: {
            email,
          },
          data: {
            password: await createHashedPassword(password),
          },
        });
        console.log(updatedRider);
        return res.status(200).json(updatedRider);
      }
      return res.status(401).json("incorrect password");
    }
    return res.status(401).json("unauthorized");
  } catch (e) {
    return res.status(401).json({ error: e });
  }
};

export const passwordRiderChangeHandler = (req: Request, res: Response) => {
  // Cast the request object to an AuthenticatedRequest object
  const authenticatedReq = req as AuthenticatedRequest;

  // Call the updateProfile function with the authenticatedReq object
  passwordChange(authenticatedReq, res);
}
