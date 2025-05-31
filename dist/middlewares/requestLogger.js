"use strict";
/**
 * @file requestLogger.ts
 * @description Middleware pour logger les requêtes HTTP entrantes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const date = new Date().toISOString();
    console.log(`[${date}] ${req.method} ${req.originalUrl}`);
    next();
};
exports.requestLogger = requestLogger;
