/**
 * @file contactRoutes.ts
 * @description Définition des routes Express pour les messages de contact.
 */

import { Router } from 'express';
import { ContactController } from '../controllers/ContactController';

const router = Router();

// Créer un message de contact
router.post('/', ContactController.createContact);

// Récupérer tous les messages de contact
router.get('/', ContactController.getAllContacts);

// Récupérer un message de contact par ID
router.get('/:id', ContactController.getContactById);

// Mettre à jour un message de contact
router.put('/:id', ContactController.updateContact);

// Supprimer un message de contact
router.delete('/:id', ContactController.deleteContact);

export default router;
