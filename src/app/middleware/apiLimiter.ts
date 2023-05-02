import { rateLimit } from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false, 
});

export const loginRateLimiter = rateLimit({
  windowMs: 3 * 60 * 60 * 1000, // 15 minutes
  max: 10, 
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  
});

export const requestVerificationLimit = rateLimit({
  windowMs: 60 * 1000, 
  max: 1, 
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true, 
});
