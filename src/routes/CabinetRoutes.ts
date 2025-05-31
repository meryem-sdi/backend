/**
 * @file cabinet.routes.ts
 * @description Définition des routes Express pour les cabinets.
 */

import { Router } from 'express';
import { CabinetController } from '../controllers/CabinetController';

const router = Router();

//  Créer un cabinet
router.post('/', CabinetController.createCabinet);

//  Récupérer tous les cabinets
router.get('/', CabinetController.getAllCabinets);

// Récupérer un cabinet par ID
router.get('/:id', CabinetController.getCabinetById);

//  Mettre à jour un cabinet
router.put('/:id', CabinetController.updateCabinet);

// Supprimer un cabinet
router.delete('/:id', CabinetController.deleteCabinet);

export default router;
