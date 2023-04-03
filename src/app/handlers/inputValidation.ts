import { body } from "express-validator";

export const signupValidation = [
  body("name").exists().isString().isLength({ max: 15, min: 2 }),
  body("phone").exists().isMobilePhone(["en-NG", "en-GH"]),
  body("email").exists().isEmail(),
  body("password").exists().isStrongPassword(),
];
export const loginValidation = [
  body("email").exists().isEmail(),
  body("password").exists().isLength({ max: 15, min: 2 }),
];
