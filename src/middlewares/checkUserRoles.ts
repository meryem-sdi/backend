/**
 * @file checkUserRole.ts
 * @description Middleware pour vérifier le rôle de l'utilisateur connecté.
 */

import { Request, Response, NextFunction } from 'express';

export const checkUserRole = (rolesAutorises: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.role) {
      return res.status(403).json({ message: 'Accès interdit. Aucun rôle défini.' });
    }

    if (!rolesAutorises.includes(user.role)) {
      return res.status(403).json({ message: 'Accès interdit. Rôle non autorisé.' });
    }

    next();
  };
};
