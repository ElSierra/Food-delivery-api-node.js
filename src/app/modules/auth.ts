import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    { id: user.email, email: user.id },

    process.env.SECRET || "",
    { expiresIn: "7d" }
  );

  return token;
};

export const createEmailJWT = (email : string) => {
  const token = jwt.sign(
    { email },

    process.env.SECRET || "",
    { expiresIn: "5h" }
  );

  return token;
};
