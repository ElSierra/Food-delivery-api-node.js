import { Response } from "./../../node_modules/@types/express/index.d";
import { Request } from "./../../node_modules/@types/express-serve-static-core/index.d";
import { Router } from "express";
import { getUser } from "./handlers/getUser";

const router = Router();

router.get("/home", (req: Request, res: Response) => {
  res.status(200).json({ message: "Okay" });
});
router.get("/auth/user", getUser);
export default router;
