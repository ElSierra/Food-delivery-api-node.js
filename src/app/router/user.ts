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
} from "../handlers/auth/module/inputValidation";
import { passwordChangeHandler } from "../handlers/user/signin/passwordChange";
import { handleErrors } from "../modules/auth/handleErrors";
import { updateLocationHandler } from "../handlers/user/profile/updateLocation";
import { checkVerified } from "../modules/auth/auth";


import {
  updateProfilePicOcean,
  uploadPhotoOcean,
} from "../handlers/user/profile/uploadProfilePicture";
import { orderFood } from "../handlers/user/order/orderFood";
import { makePayment } from "../handlers/user/order/makePayment";

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

userRouter.put("/upload-avatar", uploadPhotoOcean, updateProfilePicOcean);



export default userRouter;
