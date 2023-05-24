import { Response } from "express";
import { Request } from "express-serve-static-core";
import { Router } from "express";
import { getUser } from "../handlers/user/profile/getUser";
import { logout } from "../handlers/logout/logout";
import {
  passwordChangeValidation,
  locationUpdateValidation,
  orderFoodValidation,
  makePaymentValidation,
  rateRestaurantsValidation,
  uploadPhotoPreviewValidation,
  updateInfoValidation,
} from "../middleware/inputValidation";
import { passwordChangeHandler } from "../handlers/user/signin/passwordChange";
import { handleErrors } from "../middleware/handleErrors";
import { updateLocationHandler } from "../handlers/user/profile/updateLocation";
import { checkVerified } from "../middleware/auth";

import {
  updateProfilePicOcean,
  uploadPhotoOcean,
} from "../handlers/user/profile/uploadProfilePicture";
import { orderFood } from "../handlers/user/order/orderFood";
import { makePayment } from "../handlers/user/order/makePayment";
import {
  checkIfUserLikedMiddleWare,
  disLikeRestaurants,
  likeRestaurants,
} from "../handlers/restaurant/createRestaurant/rateRestaurant";
import { updatePreview } from "../handlers/user/profile/updatePreview";
import { updateProfileInfo } from "../handlers/user/profile/updateProfile";

const userRouter = Router();

userRouter.get("/home", checkVerified, (req: Request, res: Response) => {
  res.status(200).json({ message: "Okay" });
});

userRouter.get("/auth/user", getUser);
userRouter.get("/auth/logout", logout);

userRouter.put(
  "/auth/change-password",
  passwordChangeValidation,
  handleErrors,
  passwordChangeHandler
);
userRouter.put(
  "/auth/update-location",
  locationUpdateValidation,
  handleErrors,
  updateLocationHandler
);
userRouter.put("/order-food", orderFoodValidation, handleErrors, orderFood);
userRouter.put(
  "/make-payment",
  makePaymentValidation,
  handleErrors,
  makePayment
);

userRouter.get(
  "/rate-restaurant",
  rateRestaurantsValidation,
  handleErrors,
  checkIfUserLikedMiddleWare,
  (req: any, res: Response) => {
    console.log(req.query);
    if (req.query.like === "true") {
      return likeRestaurants(req, res);
    } else if (req.query.like === "false") {
      return disLikeRestaurants(req, res);
    } else {
      return res.status(400).json({ error: "Error occurred" });
    }
  }
);

userRouter.put("/upload-avatar", uploadPhotoOcean, updateProfilePicOcean);
userRouter.put(
  "/upload-preview",
  uploadPhotoPreviewValidation,
  updatePreview,
  uploadPhotoOcean,
  updateProfilePicOcean
);
userRouter.put("/auth/update-info", updateInfoValidation, updateProfileInfo);

export default userRouter;
