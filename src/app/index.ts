import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import router from "./router";
import prisma from "../prisma/init";
import { createNewUser } from "./handlers/createNewUser";
import { handleErrors } from "./modules/handleErrors";
import { loginValidation, signupValidation } from "./handlers/inputValidation";
import { signInUser } from "./handlers/signInUser";
import { verifyEmail } from "./handlers/verifyEmail";
import { dropDatabase } from "./modules/dropMongo";
import { sendEmail } from "./modules/sendEmail";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.get("/", (req, res) => {
  const ipAddress = req.socket.remoteAddress;
  console.log("🚀 ~ file: index.ts:23 ~ app.get ~ ipAddress:", ipAddress?.split(':'))
  
  res.status(200).json({ msg: "hello" });
});

app.post("/api/auth/signup", signupValidation, handleErrors, createNewUser);
app.post("/api/auth/login", loginValidation, handleErrors, signInUser);
app.get("/verify/:token", verifyEmail);
app.get("/drop", dropDatabase);

// app.post("/auth/login", createNewUser);
export default app;
