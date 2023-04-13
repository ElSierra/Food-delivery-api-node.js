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

export interface ServerToClientEvents {
  message: (text: string) => void;
  location: (text: string) => void;
  verifyCheck: (text: boolean) => void;
}

export interface ClientToServerEvents {
  message: (text: string) => void;
  location: (text: string) => void;
  verifyCheck: (text: string) => void;
}