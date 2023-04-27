import { Response } from "express";
import prisma from "../../../../../lib/prisma/init";

export const setPrefsRider = async (req: any, res: Response) => {
  const { emailUpdates, mode } = req.query;
  console.log(req.user.id);
  try {
    const prefs = await prisma.rider.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        preferences: true,
      },
    });
    console.log(prefs);
    if (!prefs?.preferences) {
      const riderPrefs = await prisma.preferences.create({
        data: {
          emailUpdates: emailUpdates ? emailUpdates : undefined,
          mode: mode ? mode : undefined,
          Rider: {
            connect: {
              id: req.user.id,
            },
          },
        },
      });

      return res.status(200).json(riderPrefs);
    }
    const riderPrefs = await prisma.rider.update({
      where: {
        id: req.user.id,
      },
      data: {
        preferences: {
          update: {
            emailUpdates: emailUpdates ? emailUpdates : undefined,
            mode: mode ? mode : undefined,
          },
        },
      },
    });

    res.status(200).json(riderPrefs);
  } catch (e: any) {
    console.log(e);
  }
};
