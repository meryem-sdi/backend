"use strict";
/**
 * @file rendezvous.controller.ts
 * @description Contrôleur Express pour la gestion des rendez-vous.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendezVousController = void 0;
const RendezVousService_1 = require("../services/RendezVousService");
const RendezVous_1 = require("../models/RendezVous");
class RendezVousController {
    static createRendezVous(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, heure, statut } = req.body;
                const rdv = new RendezVous_1.RendezVous(new Date(date), heure, statut);
                const id = yield RendezVousService_1.RendezVousService.create(rdv);
                res.status(201).json({ id, message: 'Rendez-vous créé avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getRendezVousById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const rdv = yield RendezVousService_1.RendezVousService.getById(id);
                if (!rdv) {
                    res.status(404).json({ message: 'Rendez-vous non trouvé.' });
                    return;
                }
                res.status(200).json(rdv);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static updateRendezVous(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                yield RendezVousService_1.RendezVousService.update(id, data);
                res.status(200).json({ message: 'Rendez-vous mis à jour avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static deleteRendezVous(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield RendezVousService_1.RendezVousService.delete(id);
                res.status(200).json({ message: 'Rendez-vous supprimé avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getAllRendezVous(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rdvs = yield RendezVousService_1.RendezVousService.getAll();
                res.status(200).json(rdvs);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
}
exports.RendezVousController = RendezVousController;
