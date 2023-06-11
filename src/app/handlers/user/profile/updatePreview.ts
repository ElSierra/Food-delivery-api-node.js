import { NextFunction, Response } from "express";
import prisma from "../../../../../lib/prisma/init";
import base64toFile from "node-base64-to-file";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { s3Config } from "../../../../../lib/mutler/digitalOcean";
import { SpacesBucketName } from "../../../../../lib/mutler/digitalOcean";
import fs from "fs";
import { Worker } from "worker_threads";
export const updatePreview = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const worker = new Worker("/src/app/worker/saveFile.js", {
      workerData: { msg: req.body.photoPreview },
    });
    //console.log(req.body.photoPreview)
    worker.on("message", (data) => {
      console.log("🚀 ~ file: updatePreview.ts:20 ~ worker.on ~ data:", data);
      req.file = data.imagePath;

      if (req.file) {
        new Upload({
          client: s3Config,
          params: {
            ACL: "public-read",
            Bucket: SpacesBucketName,
            Key: `${Date.now().toString()}.jpg`,
            Body: data.uploadDir,
          },
          tags: [], // optional tags
          queueSize: 4, // optional concurrency configuration
          partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
          leavePartsOnError: false, // optional manually handle dropped parts
        })
          .done()
          .catch((error: any) => {
            return res.status(400).json({ msg: "worker failed to start" });
          })
          .then((data: any) => {
            console.log("data is", data);
            console.log(`${data.Location}`);
            req.file = {
              location: data.Location,
            };
            next();
          });
      }
      return res.status(400).json({ msg: "worker failed to start" });
    });
    worker.on("error", (error: any) => {
      console.log("🚀 ~ file: updatePreview.ts:55 ~ worker.on ~ error:", error);
      return res.status(500).json({ error: "error occurred (Worker issue)" });
    });
  } catch (e) {
    return res.status(400).json({ msg: "error occurred" });
  }
};
