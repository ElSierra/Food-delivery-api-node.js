import { Router } from "express";
import { getRider } from "../handlers/rider/profile/getRider";
import { setPrefsRider } from "../handlers/rider/profile/setPrefs";
import { uploadPhotoOcean } from "../handlers/user/profile/uploadProfilePicture";
import { createRestaurant } from "../handlers/restaurant/createRestaurant/createRestaurant";

const restAdminRouter = Router();

restAdminRouter.post("/create-restaurant", uploadPhotoOcean, createRestaurant);

export default restAdminRouter;
