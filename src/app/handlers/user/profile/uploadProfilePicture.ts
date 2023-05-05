import { NextFunction, Request, Response } from "express";
import {
  deleteOcean,
  upload,
  uploadOcean,
} from "../../../../../lib/mutler/mutler";
import prisma from "../../../../../lib/prisma/init";
import fs from "fs";
export const updateProfilePic = async (req: any, res: Response) => {
  console.log("gotten to the profile chnage pic");
  const url = req.protocol + "://" + req.get("host");

  try {
    const checkgetOldPic = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        photo: true,
      },
    });
    // if (!checkgetOldPic){
    //   return res.status(400).json({msg: 'Error occurred'})
    // }
    const pictureName = checkgetOldPic?.photo?.split("/");
    console.log(
      "🚀 ~ file: uploadProfilePicture.ts:21 ~ updateProfilePic ~ pictureName:",
      pictureName
    );

    if (pictureName) {
      fs.unlink(`uploads/${pictureName[pictureName.length - 1]}`, (err) => {
        if (err) {
        }

        console.log("Delete File successfully.");
      });
    }
    const userWithProfilePicture = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        photo: req.file.filename,
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
      console.log(
        "🚀 ~ file: uploadProfilePicture.ts:34 ~ uploadHandler ~ file:",
        file
      );

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

      if (errorMessage.message) {
        const [, msg] = errorMessage.message.split(":");
        return res.status(400).json({ msg });
      }
    }
  });
};
export const uploadPhotoOcean = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const uploadHandler = uploadOcean.single("photo");

  uploadHandler(req, res, (error) => {
    if (!error) {
      const file = req.file;
      console.log(
        "🚀 ~ file: uploadProfilePicture.ts:34 ~ uploadHandler ~ file:",
        file
      );

      if (!file) {
        return res.status(400).json({ msg: "Please upload a photo" });
      } else {
        next();
      }
    } else {
      const errorMessage = new Error(error);
      console.log(error, "uploadHandler");
      if (errorMessage.message) {
        const [, msg] = errorMessage.message.split(":");
        return res.status(400).json({ msg });
      }
    }
  });
};

export const updateProfilePicOcean = async (req: any, res: Response) => {
  console.log("gotten to the profile chnage pic");

  try {
    const checkgetOldPic = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        photo: true,
      },
    });
    // if (!checkgetOldPic){
    //   return res.status(400).json({msg: 'Error occurred'})
    // }

    if (checkgetOldPic?.photo) {
      const key = checkgetOldPic.photo.split("/");
      deleteOcean(key[key.length - 1])
        .then((e) => {
          console.log("completed with", e);
        })
        .catch((e) => {
          console.log(new Error(e));
        });
    }
    const userWithProfilePicture = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        photo: req.file.location,
      },
    });
    if (userWithProfilePicture) {
      return res.status(200).json({ msg: "Success", url: req.file.filename });
    }
    return res.status(400).json({ msg: "Failed to update" });
  } catch (error) {
    res.status(400).json({ error, msg: "Error Occurred" });
  }
};
