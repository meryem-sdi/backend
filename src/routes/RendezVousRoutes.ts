/**
 * @file rendezvous.routes.ts
 * @description Définition des routes Express pour les rendez-vous.
 */

import { Router } from 'express';
import { RendezVousController } from '../controllers/RendezVousController';

const router = Router();

//  Créer un rendez-vous
router.post('/', RendezVousController.createRendezVous);

//  Récupérer tous les rendez-vous
router.get('/', RendezVousController.getAllRendezVous);

// Récupérer un rendez-vous par ID
router.get('/:id', RendezVousController.getRendezVousById);

//  Mettre à jour un rendez-vous
router.put('/:id', RendezVousController.updateRendezVous);

//  Supprimer un rendez-vous
router.delete('/:id', RendezVousController.deleteRendezVous);

export default router;
