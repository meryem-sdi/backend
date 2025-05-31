/**
 * @file authMiddleware.ts
 * @description Middleware pour vérifier l'authentification Firebase.
 */

import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

// Étendre l'interface Request pour inclure user
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        role: string;
      };
    }
  }
}

/**
 * Vérifier la présence et la validité d'un Firebase ID Token.
 * Injecte dans req.user : { uid, role }
 */
export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token manquant.' });
    return;
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    // decoded contient uid, email, custom claims (dont "role").
    req.user = {
      uid: decoded.uid,
      role: (decoded.role as string) || 'client', // si aucun rôle, on considère "client"
    };
    next();
  } catch (error) {
    console.error('Token invalide:', error);
    res.status(401).json({ message: 'Token invalide ou expiré.' });
  }
}

/**
 * Vérifier que l'utilisateur a l'un des rôles autorisés.
 * Usage : router.get('/admin-route', validateToken, checkRole(['admin']), controller)
 */
export function checkRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      res.status(403).json({ message: 'Accès refusé : rôle non autorisé.' });
      return;
    }
    next();
  };
}
