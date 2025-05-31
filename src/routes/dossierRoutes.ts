import { Router } from 'express';
import * as dossierController from '../controllers/dossierController';
import { validateToken, checkRole } from '../middlewares/authMiddleware';

const router = Router();

/**
 * POST /api/dossiers
 * Créer un nouveau dossier (accessible aux rôles : admin, secrétaire)
 */
router.post(
  '/',
  validateToken,
  checkRole(['admin', 'secretaire']),
  dossierController.createDossier
);

/**
 * GET /api/dossiers
 * Lister tous les dossiers accessibles à l'utilisateur connecté
 */
router.get(
  '/',
  validateToken,
  dossierController.getDossiers
);

/**
 * GET /api/dossiers/:id
 * Récupérer un dossier précis par son ID
 */
router.get(
  '/:id',
  validateToken,
  dossierController.getDossierById
);

/**
 * PUT /api/dossiers/:id
 * Mettre à jour un dossier (accessible aux rôles : admin, avocat responsable)
 */
router.put(
  '/:id',
  validateToken,
  checkRole(['admin', 'avocat']),
  dossierController.updateDossier
);

/**
 * DELETE /api/dossiers/:id
 * Supprimer un dossier (accessible aux rôles : admin, avocat responsable)
 */
router.delete(
  '/:id',
  validateToken,
  checkRole(['admin', 'avocat']),
  dossierController.deleteDossier
);

export default router; 