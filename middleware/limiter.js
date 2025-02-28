import { rateLimit } from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  headers: true,
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const signUpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  headers: true,
  message: 'Too many account creation actions. Try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  headers: true,
  message: 'Too many message requests. Try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
