import { Request, Response } from "express";
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;

export async function dropDatabase(req: Request, res: Response) {
  if (uri) {
    const client = new MongoClient(uri);

    try {
      await client.connect();
      console.log("Connected to the database server");

      const database = client.db();
      await database.dropDatabase();
      res.send("Database dropped successfully");
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
      console.log("Connection closed");
    }
  }
}
