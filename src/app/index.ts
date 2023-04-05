import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import prisma from "../prisma/init";
import { createNewUser } from "./handlers/auth/signup/createNewUser";
import { handleErrors } from "./modules/handleErrors";
import {
  emailJWTValidation,
  loginValidation,
  otpValidation,
  resetPasswordValidation,
  signupValidation,
} from "./handlers/auth/module/inputValidation";
import { signInUser } from "./handlers/auth/signin/signInUser";
import { verifyEmail } from "./handlers/auth/signup/verifyEmail";
import { dropDatabase } from "./modules/dropMongo";

import { checkVerificationStream } from "./modules/verifyStreams";
import { generateOTP } from "./modules/generateOTP";
import { verifyOTP } from "./handlers/auth/signin/verifyOTP";
import { protect } from "./modules/auth";
import { apiLimiter } from "./modules/apiLimiter";
import { passwordReset } from "./handlers/auth/signin/passwordReset";
import { generateNewPassword } from "./handlers/auth/signin/generateNewPassword";
import { generateStrongPassword } from "./modules/generateStrongPassword";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const ipAddress = req.socket.remoteAddress;
  console.log(
    "🚀 ~ file: index.ts:23 ~ app.get ~ ipAddress:",
    ipAddress?.split(":")
  );

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

//checkVerificationStream("642b3dd392a744e5f57c1e4b");
app.use("/api", protect, router);

// app.post("/auth/login", createNewUser);
export default app;
