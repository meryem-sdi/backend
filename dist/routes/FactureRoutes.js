"use strict";
/**
 * @file facture.routes.ts
 * @description Définition des routes Express pour les factures.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FactureController_1 = require("../controllers/FactureController");
const router = (0, express_1.Router)();
// ➕ Créer une facture
router.post('/', FactureController_1.FactureController.createFacture);
// 📄 Récupérer toutes les factures
router.get('/', FactureController_1.FactureController.getAllFactures);
// 🔍 Récupérer une facture par ID
router.get('/:id', FactureController_1.FactureController.getFactureById);
// ✏️ Mettre à jour une facture
router.put('/:id', FactureController_1.FactureController.updateFacture);
// 🗑️ Supprimer une facture
router.delete('/:id', FactureController_1.FactureController.deleteFacture);
exports.default = router;
