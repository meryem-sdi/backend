/**
 * @file validateEmailAndPassword.ts
 * @description Middleware pour valider l'email et le mot de passe.
 */

import { Request, Response, NextFunction } from 'express';

export const validateEmailAndPassword = (req: Request, res: Response, next: NextFunction) => {
  const { email, motDePasse } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Format d'email invalide." });
  }

  if (!passwordRegex.test(motDePasse)) {
    return res.status(400).json({
      message:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
    });
  }

  next();
};
