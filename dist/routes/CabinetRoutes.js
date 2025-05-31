"use strict";
/**
 * @file cabinet.routes.ts
 * @description Définition des routes Express pour les cabinets.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CabinetController_1 = require("../controllers/CabinetController");
const router = (0, express_1.Router)();
//  Créer un cabinet
router.post('/', CabinetController_1.CabinetController.createCabinet);
//  Récupérer tous les cabinets
router.get('/', CabinetController_1.CabinetController.getAllCabinets);
// Récupérer un cabinet par ID
router.get('/:id', CabinetController_1.CabinetController.getCabinetById);
//  Mettre à jour un cabinet
router.put('/:id', CabinetController_1.CabinetController.updateCabinet);
// Supprimer un cabinet
router.delete('/:id', CabinetController_1.CabinetController.deleteCabinet);
exports.default = router;
