import prisma from "../../../../lib/prisma/init";
import { createHashedPassword } from "../../middleware/auth";

export const AddPasswordToDB = async (email: string, password: string) => {
  try {
    const user = await prisma.restaurantAdmin.update({
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
