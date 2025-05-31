"use strict";
/**
 * @file dossierclient.routes.ts
 * @description Définition des routes Express pour les dossiers clients.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DossierClientController_1 = require("../controllers/DossierClientController");
const router = (0, express_1.Router)();
// ➕ Créer un dossier
router.post('/', DossierClientController_1.DossierClientController.createDossier);
// 📄 Récupérer tous les dossiers
router.get('/', DossierClientController_1.DossierClientController.getAllDossiers);
// 🔍 Récupérer un dossier par ID
router.get('/:id', DossierClientController_1.DossierClientController.getDossierById);
// ✏️ Mettre à jour un dossier
router.put('/:id', DossierClientController_1.DossierClientController.updateDossier);
// 🗑️ Supprimer un dossier
router.delete('/:id', DossierClientController_1.DossierClientController.deleteDossier);
exports.default = router;
