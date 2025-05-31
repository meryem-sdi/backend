"use strict";
/**
 * @file rendezvous.routes.ts
 * @description Définition des routes Express pour les rendez-vous.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RendezVousController_1 = require("../controllers/RendezVousController");
const router = (0, express_1.Router)();
// ➕ Créer un rendez-vous
router.post('/', RendezVousController_1.RendezVousController.createRendezVous);
// 📄 Récupérer tous les rendez-vous
router.get('/', RendezVousController_1.RendezVousController.getAllRendezVous);
// 🔍 Récupérer un rendez-vous par ID
router.get('/:id', RendezVousController_1.RendezVousController.getRendezVousById);
// ✏️ Mettre à jour un rendez-vous
router.put('/:id', RendezVousController_1.RendezVousController.updateRendezVous);
// 🗑️ Supprimer un rendez-vous
router.delete('/:id', RendezVousController_1.RendezVousController.deleteRendezVous);
exports.default = router;
