import { Router } from "express";
import { getRider } from "../handlers/rider/profile/getRider";
import { setPrefsRider } from "../handlers/rider/profile/setPrefs";
import { uploadPhotoOcean } from "../handlers/user/profile/uploadProfilePicture";
import { createRestaurant } from "../handlers/restaurant/createRestaurant/createRestaurant";
import { CreateRestaurantValidation } from "../middleware/inputValidation";
import { handleErrors } from "../middleware/handleErrors";
import { getRestaurantAdmin } from "../handlers/restaurantAdmin/profile/getRestaurantAdmin";

const restAdminRouter = Router();

restAdminRouter.post(
  "/create-restaurant",
  uploadPhotoOcean,
  CreateRestaurantValidation,
  handleErrors,

  createRestaurant
);
restAdminRouter.get("/auth/rest-admin", getRestaurantAdmin);

export default restAdminRouter;
