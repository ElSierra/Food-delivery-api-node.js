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

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  client.on("error", (err) => console.log("❌ Redis Client Error", err));

  await client.connect().then((e) => {
    console.log("🚀 connected");
  }).catch(e=>{
    console.log(`error is ${e}`)
  });
})();

app.get("/", async (req, res) => {

  // const ipAddress = req.socket.remoteAddress;
  // console.log(
  //   "🚀 ~ file: index.ts:23 ~ app.get ~ ipAddress:",
  //   ipAddress?.split(":")
  // );

  res.status(200).json({ msg: "hello" });
});

app.use(apiLimiter);
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
app.get("/drop", dropDatabase);
app.get('/populate', populateRestauarnt)

//checkVerificationStream("642b3dd392a744e5f57c1e4b");
app.use("/api", blockJWT, protect, router);

// app.post("/auth/login", createNewUser);
export default app;
