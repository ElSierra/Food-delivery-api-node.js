import prisma from "../../../../lib/prisma/init";
import { sendOTP } from "../email/sendOTP";


export const createAddOTP = async (email: string, OTP: number) => {
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        OTP,
      },
    });
    setTimeout(async () => {
      const user = await prisma.user.update({
        where: {
          email,
        },
        data: {
          OTP: 1,
        },
      });
    }, 600000);
    sendOTP(user.OTP, "Food APP", user.email, user.name);

  } catch (e: any) {
    console.log(e);
  }
};
