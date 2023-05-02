import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.DATABASE_URL || "";

// Replace the following with the specified user you want to monitor changes for

const client = new MongoClient(uri);
export const collection = client.db().collection("User");

