import { Response } from "./../../node_modules/@types/express/index.d";
import { Request } from "./../../node_modules/@types/express-serve-static-core/index.d";
import { Router } from "express";
import { getUser } from "./handlers/user/profile/getUser";
import { logout } from "./handlers/logout/logout";
import {
  passwordChangeValidation,
  locationUpdateValidation,
  orderFoodValidation,
  makePaymentValidation,
} from "./handlers/auth/module/inputValidation";
import { passwordChangeHandler } from "./handlers/user/signin/passwordChange";
import { handleErrors } from "./modules/auth/handleErrors";
import { updateLocationHandler } from "./handlers/user/profile/updateLocation";
import { checkVerified } from "./modules/auth/auth";
import { getRestaurantsAll } from "./handlers/restaurant/getAllRestaurants";
import { getRestaurantsByName } from "./handlers/restaurant/getRestaurantsByName";

import {
  updateProfilePic,
  updateProfilePicOcean,
  uploadPhoto,
  uploadPhotoOcean,
} from "./handlers/user/profile/uploadProfilePicture";
import { orderFood } from "./handlers/user/order/orderFood";
import { makePayment } from "./handlers/user/order/makePayment";
import { getRider } from "./handlers/rider/profile/getRider";
import { setPrefsRider } from "./handlers/rider/profile/setPrefs";

const router = Router();

router.get("/home", checkVerified, (req: Request, res: Response) => {
  res.status(200).json({ message: "Okay" });
});


//? User EndPoints
router.get("/auth/user", getUser);
router.get("/auth/logout", logout);

router.put(
  "/auth/change-password",
  passwordChangeValidation,
  handleErrors,
  passwordChangeHandler
);
router.put(
  "/auth/update-location",
  locationUpdateValidation,
  handleErrors,
  updateLocationHandler
);
router.put("/order-food", orderFoodValidation, handleErrors, orderFood);
router.put("/make-payment", makePaymentValidation, handleErrors, makePayment);

router.put("/upload-avatar", uploadPhotoOcean, updateProfilePicOcean);



//? Rider EndPoints
router.get("/auth/rider", getRider);
router.put("/auth/rider/updatePrefs", setPrefsRider)

//? Restaurant EndPoints
router.get("/all-restaurants", (req, res) => {
  if (req.query.name) {
    return getRestaurantsByName(req, res);
  } else {
    return getRestaurantsAll(req, res);
  }
});
export default router;
