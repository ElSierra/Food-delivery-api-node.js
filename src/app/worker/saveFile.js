const base64toFile = require("node-base64-to-file");
const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");

const handleConvertImage = async () => {
  const imagePath = await base64toFile(workerData.msg, {
    filePath: "./uploads",
    randomizeFileNameLength: 14,
    types: ["png"],
    fileMaxSize: 3145728,
  });
  console.log(imagePath);

  const uploadDir = fs.readFileSync(`./uploads/${imagePath}`);

  parentPort?.postMessage({ imagePath, uploadDir });
};

handleConvertImage();
