"use strict";
/**
 * @file errorHandler.ts
 * @description Middleware global de gestion des erreurs.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Erreur interceptée :', err.stack);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
};
exports.errorHandler = errorHandler;
