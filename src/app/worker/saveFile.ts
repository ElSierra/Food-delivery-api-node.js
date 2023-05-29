import base64toFile from "node-base64-to-file";
import { parentPort, workerData } from "worker_threads";
import fs from "fs";

const handleConvertImage = async () => {
  const imagePath = (await base64toFile(workerData.msg, {
    filePath: "./uploads",
    randomizeFileNameLength: 14,
    types: ["png"],
    fileMaxSize: 3145728,
  })) as string;
  console.log(imagePath);

 const uploadDir =  fs.readFileSync(`./uploads/${imagePath}`);

  parentPort?.postMessage({imagePath, uploadDir});
};

handleConvertImage();
