import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: { email: string; id: string };
  token: string;
  verified: boolean;
}

export const userResponse = {
  id: true,
  email: true,
  name: true,
  verified: true,
  phone: true,
  location: true,
  photo: true,
  OTP: true,
  payment: true,
  orders: true,
};
