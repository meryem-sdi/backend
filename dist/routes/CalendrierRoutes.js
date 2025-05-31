"use strict";
/**
 * @file calendrier.routes.ts
 * @description Routes Express pour les créneaux de calendrier.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CalendrierController_1 = require("../controllers/CalendrierController");
const router = (0, express_1.Router)();
// ➕ Créer un créneau
router.post('/', CalendrierController_1.CalendrierController.createCalendrier);
// 📄 Tous les créneaux
router.get('/', CalendrierController_1.CalendrierController.getAllCalendriers);
// 🔍 Un créneau spécifique
router.get('/:id', CalendrierController_1.CalendrierController.getCalendrierById);
// ✏️ Modifier un créneau
router.put('/:id', CalendrierController_1.CalendrierController.updateCalendrier);
// 🗑️ Supprimer un créneau
router.delete('/:id', CalendrierController_1.CalendrierController.deleteCalendrier);
exports.default = router;
