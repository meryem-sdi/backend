"use strict";
/**
 * @file document.routes.ts
 * @description Définition des routes Express pour les documents.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DocumentController_1 = require("../controllers/DocumentController");
const router = (0, express_1.Router)();
// Créer un document
router.post('/', DocumentController_1.DocumentController.createDocument);
// Récupérer tous les documents
router.get('/', DocumentController_1.DocumentController.getAllDocuments);
//  Récupérer un document par ID
router.get('/:id', DocumentController_1.DocumentController.getDocumentById);
// Mettre à jour un document
router.put('/:id', DocumentController_1.DocumentController.updateDocument);
// Supprimer un document
router.delete('/:id', DocumentController_1.DocumentController.deleteDocument);
exports.default = router;
