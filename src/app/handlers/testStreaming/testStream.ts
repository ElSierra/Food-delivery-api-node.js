import { Request, Response } from "express";
import fs from "fs";
export const testStream = (req: Request, res: Response) => {
  const fileSize = fs.statSync("uploads/pexels-ivan-khmelyuk-7222009.mp4").size;
  console.log("🚀 ~ file: testStream.ts:5 ~ testStream ~ fileSize:", fileSize)

  const range = req.headers.range;

  if (range) {
    const [start, end] = range.replace(/bytes=/, "").split("-");
    const chunkSize = Number(end) - Number(start) + 1;
    const file = fs.createReadStream("uploads/pexels-ivan-khmelyuk-7222009.mp4", {
      start: parseInt(start),
      end: parseInt(end),
    });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream("uploads/pexels-ivan-khmelyuk-7222009.mp4").pipe(res);
  }
};
