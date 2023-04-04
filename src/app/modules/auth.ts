import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

export const createHashedPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const compareHashedPassword = (
  password: string,
  hashPassword: string
) => {
  return bcrypt.compare(password, hashPassword);
};

export const createJWT = (user: { email: string; id: string }) => {
  const token = jwt.sign(
    { email: user.email, id: user.id },

    process.env.SECRET || "",
    { expiresIn: "7d" }
  );

  return token;
};

export const createEmailJWT = (email: string) => {
  const token = jwt.sign(
    { email },

    process.env.SECRET || "",
    { expiresIn: "5h" }
  );

  return token;
};

export const protect = (req: any, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const [, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).json({ message: "invalid token" });
  }
  try {
    const user = jwt.verify(token, process.env.SECRET || "");
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "invalid token" });
  }
};
