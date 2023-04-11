import { Response } from "./../../node_modules/@types/express/index.d";
import { Request } from "./../../node_modules/@types/express-serve-static-core/index.d";
import { Router } from "express";
import { getUser } from "./handlers/user/profile/getUser";
import { logout } from "./handlers/logout/logout";
import {
  passwordChangeValidation,
  locationUpdateValidation,
} from "./handlers/auth/module/inputValidation";
import { passwordChangeHandler } from "./handlers/user/signin/passwordChange";
import { handleErrors } from "./modules/auth/handleErrors";
import { updateLocationHandler } from "./handlers/user/profile/updateLocation";
import { checkVerified } from "./modules/auth/auth";
import { getRestaurantsAll } from "./handlers/restaurant/getAllRestaurants";
import { getRestaurantsByName } from "./handlers/restaurant/getRestaurantsByName";

const router = Router();

router.get("/home", checkVerified, (req: Request, res: Response) => {
  res.status(200).json({ message: "Okay" });
});
router.get("/auth/user", getUser);
router.get("/auth/logout", logout);
router.get("/all-restaurants", (req, res) => {
  if (req.query.name) {
    return getRestaurantsByName(req, res);
  } else {
    return getRestaurantsAll(req, res);
  }
});
router.put(
  "/auth/change-password",
  passwordChangeValidation,
  handleErrors,
  passwordChangeHandler
);
router.put(
  "/auth/update-profile",
  locationUpdateValidation,
  handleErrors,
  updateLocationHandler
);
export default router;
