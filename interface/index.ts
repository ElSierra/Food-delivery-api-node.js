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
  preferences: true,
  balance: true,
  orders: {
    include: {
      rider: {
        select: {
          location: true,
          phone: true,
          email: true,
        },
      },
    },
  },
};

export const restaurantAdminResponse = {
  id: true,
  email: true,
  name: true,
  verified: true,
  phone: true,
  location: true,
  photo: true,
  OTP: true,
  payment: true,
  preferences: true,
  balance: true,
  restaurant : true,
  orders: {
    include: {
      rider: {
        select: {
          location: true,
          phone: true,
          email: true,
        },
      },
    },
  },
};


export const riderResponse = {
  id: true,
  email: true,
  name: true,
  verified: true,
  phone: true,
  location: true,
  photo: true,
  OTP: true,
  preferences: true,
  balance: true,
  orders: {
    include: {
      user: {
        select: {
          location: true,
          phone: true,
          email: true,
        },
      },
      restaurant: {
        select: {
          location: true,
        },
      },
    },
  },
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
