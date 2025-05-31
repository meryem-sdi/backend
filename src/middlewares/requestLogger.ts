/**
 * @file requestLogger.ts
 * @description Middleware pour logger les requêtes HTTP entrantes.
 */

import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const date = new Date().toISOString();
  console.log(`[${date}] ${req.method} ${req.originalUrl}`);
  next();
};
