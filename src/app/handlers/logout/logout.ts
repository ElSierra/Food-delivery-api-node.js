import { Request, Response } from "express";
import client from "../../../../lib/redis/init";

export const logout = (req: any, res: Response) => {
  const token = req.token;
  client
    .set(token, token)
    .then((e) => {
      return res.status(200).json({ msg: "secure logout" });
    })
    .catch((e) => {
     
      return res.status(401).json({ msg: "unsecure logout", e });
     
    });
};
