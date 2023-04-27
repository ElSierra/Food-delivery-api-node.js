import { Router } from "express";
import { getRider } from "../handlers/rider/profile/getRider";
import { setPrefsRider } from "../handlers/rider/profile/setPrefs";

const riderRouter = Router();

riderRouter.get("/auth/rider", getRider);
riderRouter.put("/auth/rider/updatePrefs", setPrefsRider);


export default riderRouter