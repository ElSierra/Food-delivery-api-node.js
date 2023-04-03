import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(404).json(errors);
  } else {
    next();
  }
};
