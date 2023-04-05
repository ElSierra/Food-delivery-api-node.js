import prisma from "../../prisma/init";
import { createHashedPassword } from "./auth";

export const AddPasswordToDB = async (email: string, password: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: await createHashedPassword(password),
      },
    });
    return user;
  } catch (e: any) {
    console.log(e);
  }
};
