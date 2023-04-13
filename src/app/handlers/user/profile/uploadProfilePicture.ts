import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../../interface";
import prisma from "../../../../prisma/init";
import fs from "fs";
import path from "path";

export const updateProfilePic = (req: AuthenticatedRequest, res: Response) => {
  console.log(
    fs.readFileSync(path.join(__dirname + "/uploads/" + req.file?.filename))
  );
};
// const updatedUser = prisma.user.update({
//   where: {
//     id : req.user.id,
//   },
//   data: {
//     photo:
//   }
// })

export const updateProfilePictureHandler = (req: Request, res: Response) => {
  // Cast the request object to an AuthenticatedRequest object
  const authenticatedReq = req as AuthenticatedRequest;

  // Call the updateProfile function with the authenticatedReq object
  updateProfilePic(authenticatedReq, res);
};
