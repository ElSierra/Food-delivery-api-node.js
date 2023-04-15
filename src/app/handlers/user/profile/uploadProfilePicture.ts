import { NextFunction, Request, Response } from "express";
import { upload } from "../../../modules/mutler/mutler";
import prisma from "../../../../prisma/init";
import fs from "fs";
export const updateProfilePic = async (req: any, res: Response) => {
  const url = req.protocol + "://" + req.get("host");

  try {
    const userWithProfilePicture = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        photo: `${url}/pic/${req.file.filename}`,
      },
    });
    if (userWithProfilePicture) {
      return res
        .status(200)
        .json({ msg: "Success", url: `${url}/pic/${req.file.filename}` });
    }
    return res.status(400).json({ msg: "Failed to update" });
  } catch (error) {
    res.status(400).json({ error, msg: "Error Occured" });
  }
};

export const uploadPhoto = (req: any, res: Response, next: NextFunction) => {
  const uploadHandler = upload.single("photo");

  uploadHandler(req, res, (error) => {
    if (!error) {
      const file = req.file;
      console.log("🚀 ~ file: uploadProfilePicture.ts:34 ~ uploadHandler ~ file:", file)

      if (!file) {
        return res.status(400).json({ msg: "Please upload a photo" });
 
      } else {
 
        fs.access(file.path, fs.constants.F_OK, (err) => {
          if (err) {
            res.status(400).json({ msg: "Please upload a file", err });
        
          } else {
            next();
        
          }
        });
      }
    } else {
      const errorMessage = new Error(error);

      if (errorMessage.message){
        const [,msg] = errorMessage.message.split(':')
        return res.status(400).json( {msg} );
      }

    }
  });
};
// const updatedUser = prisma.user.update({
//   where: {
//     id : req.user.id,
//   },
//   data: {
//     photo:
//   }
// })

// export const updateProfilePictureHandler = (req: Request, res: Response) => {
//   // Cast the request object to an AuthenticatedRequest object
//   const authenticatedReq = req as AuthenticatedRequest;

//   // Call the updateProfile function with the authenticatedReq object
//   updateProfilePic(authenticatedReq, res);
// };
