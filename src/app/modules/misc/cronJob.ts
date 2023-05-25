import cron from "node-cron";
import fsPromises from "fs/promises";
import path from "path";

export const cronJob = async () => {
  cron.schedule("0 0 0 * * *", async () => {
    try {
      // Find all files in the folder
      const files = await fsPromises.readdir("./uploads");
      for (const file of files) {
        await fsPromises.unlink(path.resolve("./uploads", file));
        console.log(`${"./uploads"}/${file} has been removed successfully`);
      }
    } catch (err) {
      console.log(err);
    }
  });
};
