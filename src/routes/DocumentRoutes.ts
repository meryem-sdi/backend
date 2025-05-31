/**
 * @file document.routes.ts
 * @description Définition des routes Express pour les documents.
 */

import { Router } from 'express';
import { DocumentController } from '../controllers/DocumentController';

const router = Router();

// Créer un document
router.post('/', DocumentController.createDocument);

// Récupérer tous les documents
router.get('/', DocumentController.getAllDocuments);

//  Récupérer un document par ID
router.get('/:id', DocumentController.getDocumentById);

// Mettre à jour un document
router.put('/:id', DocumentController.updateDocument);

// Supprimer un document
router.delete('/:id', DocumentController.deleteDocument);

export default router;
