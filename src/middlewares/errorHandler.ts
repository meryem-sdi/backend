/**
 * @file errorHandler.ts
 * @description Middleware global de gestion des erreurs.
 */

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Erreur:', err);

  // Gestion des erreurs Firebase
  if (err.name === 'FirebaseError') {
    return res.status(400).json({
      message: 'Erreur Firebase',
      error: err.message
    });
  }

  // Gestion des erreurs de validation
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Données invalides',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  // Gestion des erreurs d'authentification
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Non authentifié',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  // Erreur par défaut
  res.status(500).json({
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};
