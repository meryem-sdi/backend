/**
 * @file dossierclient.routes.ts
 * @description Définition des routes Express pour les dossiers clients.
 */

import { Router } from 'express';
import { DossierClientController } from '../controllers/DossierClientController';

const router = Router();


router.post('/', DossierClientController.createDossier);
router.get('/', DossierClientController.getAllDossiers);
router.get('/:id', DossierClientController.getDossierById);
router.put('/:id', DossierClientController.updateDossier);
router.delete('/:id', DossierClientController.deleteDossier);

export default router;
