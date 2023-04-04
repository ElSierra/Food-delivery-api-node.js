import { MongoClient, ObjectId } from "mongodb";

export const checkVerificationStream = async (targetUserId: string) => {
  const uri = process.env.DATABASE_URL || "";

  // Replace the following with the specified user you want to monitor changes for
  try {
    const client = new MongoClient(uri);
    const collection = client.db().collection("User");

    const changeStream = collection.watch([
      {
        $match: {
          "documentKey._id": new ObjectId(targetUserId),
        },
      },
    ]);

    changeStream.on("change", (change) => {
      console.log(change); // Change object
    });
  } catch (e) {
    console.log(e);
  }
};
