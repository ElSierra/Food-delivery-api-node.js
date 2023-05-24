import { NextFunction, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import base64toFile from "node-base64-to-file";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { s3Config } from "../../../../../lib/mutler/digitalOcean";
import { SpacesBucketName } from "../../../../../lib/mutler/digitalOcean";
import fs from "fs";
export const updatePreview = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const imagePath = (await base64toFile(req.body.photoPreview, {
      filePath: "./uploads",
      randomizeFileNameLength: 14,
      types: ["png"],
      fileMaxSize: 3145728,
    })) as string;
    console.log(imagePath);

    req.file = imagePath;

    if (req.file) {
      new Upload({
        client: s3Config,
        params: {
          ACL: "public-read",
          Bucket: SpacesBucketName,
          Key: `${Date.now().toString()}.jpg`,
          Body: fs.readFileSync(`./uploads/${imagePath}`),
        },
        tags: [], // optional tags
        queueSize: 4, // optional concurrency configuration
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
      })
        .done()
        .then((data: any) => {
          console.log("data is", data);
          console.log(`${data.Location}`);
          req.file = {
            location: data.Location,
          };
          next();
        });
    }
  } catch (e) {
    return res.status(400).json({ msg: "error occurred" });
  }
};
