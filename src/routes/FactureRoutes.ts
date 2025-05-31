/**
 * @file facture.routes.ts
 * @description Définition des routes Express pour les factures.
 */

import { Router } from 'express';
import { FactureController } from '../controllers/FactureController';

const router = Router();

router.post('/', FactureController.createFacture);
router.get('/', FactureController.getAllFactures);
router.get('/:id', FactureController.getFactureById);
router.put('/:id', FactureController.updateFacture);
router.delete('/:id', FactureController.deleteFacture);

export default router;
