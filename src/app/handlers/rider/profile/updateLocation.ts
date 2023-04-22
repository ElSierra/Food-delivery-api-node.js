import { Request, Response } from "express";
import prisma from "../../../../prisma/init";
import { AuthenticatedRequest } from "../../../../../interface";

const updateLocation = async (req: AuthenticatedRequest, res: Response) => {
  const { location, address }: { location: string; address: string } = req.body;
  const [latitude, longitude] = location.split(",");
  console.log(longitude);
  console.log(req.user?.id);
  if (location) {
    // await prisma.user.update({
    //   where: {
    //     id: req.user?.id
    //   },
    //   data: {
    //     coordinates: {
    //       update: {
    //         latitude,
    //         longitude
    //       }
    //     }
    //   }
    // })
    await prisma.location
      .create({
        data: {
          latitude,
          longitude,
          address,
          User: {
            connect: {
              id: req.user?.id,
            },
          },
        },
      })

      .then((profile) => {
        return res.status(200).json(profile);
      })
      .catch((error) => {
        return res.status(400).json({ msg: "Failed to update", error });
      });
  } else {
    res.status(400).json({ msg: "bad request" });
  }
};

export const updateLocationHandler = (req: Request, res: Response) => {
  // Cast the request object to an AuthenticatedRequest object
  const authenticatedReq = req as AuthenticatedRequest;

  // Call the updateProfile function with the authenticatedReq object
  updateLocation(authenticatedReq, res);
};
