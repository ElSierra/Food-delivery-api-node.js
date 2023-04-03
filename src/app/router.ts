import { Response } from "./../../node_modules/@types/express/index.d";
import { Request } from "./../../node_modules/@types/express-serve-static-core/index.d";
import { Router } from "express";

const router = Router();

router.get("/home", (req: Request, res: Response) => {
  res.status(200).json({ message: "Okay" });
});

export default router;