import { Request, Response, NextFunction } from 'express';
import * as dossierService from '../services/dossierService';
import { IDossier } from '../models/Dossier';
import admin from 'firebase-admin';

/**
 * POST /api/dossiers
 * Créer un nouveau dossier.
 */
export async function createDossier(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      titre,
      description,
      idAvocat,
      idClient,
      dateLimite,
    } = req.body;

    if (!titre || !description || !idAvocat || !idClient) {
      res.status(400).json({ message: 'Champs requis manquants.' });
      return;
    }

    const dossierData: Partial<IDossier> = {
      titre: titre.trim(),
      description: description.trim(),
      idAvocat,
      idClient,
      statut: 'en_cours',
      dateLimite: dateLimite ? admin.firestore.Timestamp.fromDate(new Date(dateLimite)) : undefined,
    };

    const newDossier = await dossierService.createDossier(dossierData);
    res.status(201).json(newDossier);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/dossiers
 * Lister les dossiers accessibles à l'utilisateur.
 */
export async function getDossiers(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const uid = req.user.uid;
    const role = req.user.role;
    const statut = req.query.statut as string | undefined;

    const validStatuts = ['en_cours', 'clos', 'en_attente'];
    if (statut && !validStatuts.includes(statut)) {
      res.status(400).json({ message: 'Paramètre "statut" invalide.' });
      return;
    }

    const dossiers = await dossierService.getDossiersByUser(uid, role, statut);
    res.status(200).json(dossiers);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/dossiers/:id
 * Récupérer un dossier par son ID.
 */
export async function getDossierById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const dossierId = req.params.id;
    const userId = req.user.uid;
    const role = req.user.role;

    const dossier = await dossierService.getDossierById(dossierId);

    if (!dossier) {
      res.status(404).json({ message: 'Dossier non trouvé.' });
      return;
    }

    if (
      role === 'admin' ||
      role === 'secretaire' ||
      (role === 'avocat' && dossier.idAvocat === userId) ||
      (role === 'client' && dossier.idClient === userId)
    ) {
      res.status(200).json(dossier);
    } else {
      res.status(403).json({ message: 'Accès refusé à ce dossier.' });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/dossiers/:id
 * Mettre à jour un dossier existant.
 */
export async function updateDossier(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const dossierId = req.params.id;
    const userId = req.user.uid;
    const role = req.user.role;
    const updates: Partial<IDossier> = req.body;

    const dossier = await dossierService.getDossierById(dossierId);
    if (!dossier) {
      res.status(404).json({ message: 'Dossier non trouvé.' });
      return;
    }

    if (role !== 'admin' && !(role === 'avocat' && dossier.idAvocat === userId)) {
      res.status(403).json({ message: 'Accès refusé : vous n\'êtes pas autorisé à modifier ce dossier.' });
      return;
    }

    if (updates.statut) {
      const validStatuts = ['en_cours', 'clos', 'en_attente'];
      if (!validStatuts.includes(updates.statut)) {
        res.status(400).json({ message: 'Statut invalide.' });
        return;
      }
    }

    await dossierService.updateDossier(dossierId, updates);
    res.status(200).json({ message: 'Dossier mis à jour avec succès.' });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/dossiers/:id
 * Supprimer un dossier.
 */
export async function deleteDossier(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const dossierId = req.params.id;
    const userId = req.user.uid;
    const role = req.user.role;

    const dossier = await dossierService.getDossierById(dossierId);
    if (!dossier) {
      res.status(404).json({ message: 'Dossier non trouvé.' });
      return;
    }

    if (role !== 'admin' && !(role === 'avocat' && dossier.idAvocat === userId)) {
      res.status(403).json({ message: 'Accès refusé : vous n\'êtes pas autorisé à supprimer ce dossier.' });
      return;
    }

    await dossierService.deleteDossier(dossierId);
    res.status(200).json({ message: 'Dossier supprimé avec succès.' });
  } catch (error) {
    next(error);
  }
} 