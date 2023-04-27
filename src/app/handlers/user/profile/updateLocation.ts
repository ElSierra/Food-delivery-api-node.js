import { Request, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import { AuthenticatedRequest } from "../../../../../interface";

const updateLocation = async (req: AuthenticatedRequest, res: Response) => {
  const { location, address }: { location: string; address: string } = req.body;
  const [latitude, longitude] = location.split(",");
  console.log(longitude);
  console.log(req.user?.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        location: true,
      },
    });
    if (!user?.location) {
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
    }

    const userUpdateLocation = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        location: {
          update: {
            latitude,
            longitude,
            address,
          },
        },
      },
    });

    res.status(200).json(userUpdateLocation);
  } catch (e: any) {
    res.status(200).json(new Error(e).message);
  }
};
export const updateLocationHandler = (req: Request, res: Response) => {
  // Cast the request object to an AuthenticatedRequest object
  const authenticatedReq = req as AuthenticatedRequest;

  // Call the updateProfile function with the authenticatedReq object
  updateLocation(authenticatedReq, res);
};
