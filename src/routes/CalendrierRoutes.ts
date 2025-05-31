/**
 * @file calendrier.routes.ts
 * @description Routes Express pour les créneaux de calendrier.
 */

import { Router } from 'express';
import { CalendrierController } from '../controllers/CalendrierController';

const router = Router();

// ➕ Créer un créneau
router.post('/', CalendrierController.createCalendrier);

// 📄 Tous les créneaux
router.get('/', CalendrierController.getAllCalendriers);

// 🔍 Un créneau spécifique
router.get('/:id', CalendrierController.getCalendrierById);

// ✏️ Modifier un créneau
router.put('/:id', CalendrierController.updateCalendrier);

// 🗑️ Supprimer un créneau
router.delete('/:id', CalendrierController.deleteCalendrier);

export default router;
