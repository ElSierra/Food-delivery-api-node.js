import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

import multerS3 from "multer-s3";
import { SPACES_ACL, SpacesBucketName, s3Config } from "./digitalOcean";
import { Request } from "express";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const createUploadFolder = (folderName: string) => {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
};
createUploadFolder("./uploads/");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuid().replaceAll("-", "") + path.extname(file.originalname));
  },
});

const fileFilter = function (
  req: any,
  file: Express.Multer.File,
  cb: Function
) {
  console.log(file);

  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type."));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter,
});

export const uploadOcean = multer({
  fileFilter,
  limits: { fileSize: 1000000 },
  storage: multerS3({
    s3: s3Config,
    bucket: SpacesBucketName,
    acl: SPACES_ACL.PUBLIC_READ,
    key: function (request: Request, file, cb) {
      cb(null, uuid().replaceAll("-", "") + path.extname(file.originalname));
    },
  }),
});

export const deleteOcean = async (key: string) => {
  try {
    const data = await s3Config.send(
      new DeleteObjectCommand({ Bucket: process.env.SPACES_NAME, Key: key })
    );
    console.log("Success. Object deleted.", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
