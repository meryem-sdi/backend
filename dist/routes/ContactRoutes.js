"use strict";
/**
 * @file contactRoutes.ts
 * @description Définition des routes Express pour les messages de contact.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactController_1 = require("../controllers/ContactController");
const router = (0, express_1.Router)();
// Créer un message de contact
router.post('/', ContactController_1.ContactController.createContact);
// Récupérer tous les messages de contact
router.get('/', ContactController_1.ContactController.getAllContacts);
// Récupérer un message de contact par ID
router.get('/:id', ContactController_1.ContactController.getContactById);
// Mettre à jour un message de contact
router.put('/:id', ContactController_1.ContactController.updateContact);
// Supprimer un message de contact
router.delete('/:id', ContactController_1.ContactController.deleteContact);
exports.default = router;
