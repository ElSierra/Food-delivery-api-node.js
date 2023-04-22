import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import prisma from "../prisma/init";

import {
  emailJWTValidation,
  loginValidation,
  otpValidation,
  resetPasswordValidation,
  signupValidation,
} from "./handlers/auth/module/inputValidation";
import { signInUser } from "./handlers/user/signin/signInUser";

import { dropDatabase } from "./modules/dropMongo";

import { verifyOTP } from "./handlers/user/signin/verifyOTP";
import { blockJWT, protect } from "./modules/auth/auth";
import { apiLimiter } from "./modules/apiLimiter";
import { passwordReset } from "./handlers/user/signin/passwordReset";
import { generateNewPassword } from "./handlers/user/signin/generateNewPassword";

import client from "../redis/init";
import { verifyEmail } from "./handlers/user/signup/verifyEmail";
import { createNewUser } from "./handlers/user/signup/createNewUser";
import { handleErrors } from "./modules/auth/handleErrors";
import { populateRestauarnt } from "./handlers/restaurant/populateRestaurant";
import path from "path";
import fs from "fs";
import { testStream } from "./handlers/testStreaming/testStream";
import { createNewRider } from "./handlers/rider/signup/createNewRider";
import { SignInRider as signInRider } from "./handlers/rider/signin/signinRider";
import { verifyEmailRider } from "./handlers/rider/signup/verifyEmail";
import { verifyOTPRider } from "./handlers/rider/signin/verifyOTP";
import { generateNewPasswordRider } from "./handlers/rider/signin/generateNewPassword";
import { passwordResetRider } from "./handlers/rider/signin/passwordReset";
import requestIp from "request-ip";
import axios from "axios";

const app = express();

const rootDir = path.resolve(__dirname, "../..");
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  client.on("error", (err) => console.log("❌ Redis Client Error", err));

  await client
    .connect()
    .then((e) => {
      console.log("🚀 connected");
    })
    .catch((e) => {
      console.log(`error is ${e}`);
    });
})();

app.get("/", async (req, res) => {
  const ipAddress = requestIp.getClientIp(req);
  console.log(ipAddress);
  axios
    .get(
      `https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.IP_KEY}`
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use(apiLimiter);

//? User EndPoints
app.post("/api/auth/signup", signupValidation, handleErrors, createNewUser);
app.post("/api/auth/login", loginValidation, handleErrors, signInUser);
app.get("/verify/:token", emailJWTValidation, handleErrors, verifyEmail);
app.get("/reset/:token", emailJWTValidation, handleErrors, generateNewPassword);
app.put("/api/auth/otp", otpValidation, handleErrors, verifyOTP);
app.put(
  "/api/auth/reset-password",
  resetPasswordValidation,
  handleErrors,
  passwordReset
);

//? Rider EndPoints
app.post(
  "/api/auth/signup-rider",
  signupValidation,
  handleErrors,
  createNewRider
);
app.post("/api/auth/login-rider", loginValidation, handleErrors, signInRider);
app.get(
  "/verify-rider/:token",
  emailJWTValidation,
  handleErrors,
  verifyEmailRider
);
app.get(
  "/reset-rider/:token",
  emailJWTValidation,
  handleErrors,
  generateNewPasswordRider
);
app.put("/api/auth/otp-rider", otpValidation, handleErrors, verifyOTPRider);
app.put(
  "/api/auth/reset-password",
  resetPasswordValidation,
  handleErrors,
  passwordResetRider
);

//? Restaurant EndPoints
app.get("/drop", dropDatabase);
app.get("/populate", populateRestauarnt);

//? Misc EndPoints
app.get("/pic/:id", (req, res) => {
  const { id } = req.params;

  if (fs.existsSync(path.join(rootDir, "/uploads/", `${id}`))) {
    return res.sendFile(path.join(rootDir, "/uploads/", `${id}`));
  }
  return res.sendFile(path.join(rootDir, "/uploads/", `nopic.png`));
});
app.get("/testVideo", testStream);
//checkVerificationStream("642b3dd392a744e5f57c1e4b");
app.use("/api", blockJWT, protect, router);

// app.post("/auth/login", createNewUser);
export default app;
