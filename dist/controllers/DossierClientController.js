"use strict";
/**
 * @file dossierclient.controller.ts
 * @description Contrôleur Express pour les dossiers clients.
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
exports.DossierClientController = void 0;
const DossierClientServices_1 = require("../services/DossierClientServices");
const DossierClient_1 = require("../models/DossierClient");
class DossierClientController {
    static createDossier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, statut } = req.body;
                if (!Object.values(DossierClient_1.EtatDossier).includes(statut)) {
                    res.status(400).json({ message: 'Statut invalide.' });
                    return;
                }
                const dossier = new DossierClient_1.DossierClient(description, statut);
                const id = yield DossierClientServices_1.DossierClientService.create(dossier);
                res.status(201).json({ id, message: 'Dossier créé avec succès.' });
            }
            catch (error) {
                console.error('Erreur création dossier :', error);
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getDossierById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const dossier = yield DossierClientServices_1.DossierClientService.getById(id);
                if (!dossier) {
                    res.status(404).json({ message: 'Dossier non trouvé.' });
                    return;
                }
                res.status(200).json(dossier);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static updateDossier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                if (data.statut && !Object.values(DossierClient_1.EtatDossier).includes(data.statut)) {
                    res.status(400).json({ message: 'Statut invalide.' });
                    return;
                }
                yield DossierClientServices_1.DossierClientService.update(id, data);
                res.status(200).json({ message: 'Dossier mis à jour avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static deleteDossier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield DossierClientServices_1.DossierClientService.delete(id);
                res.status(200).json({ message: 'Dossier supprimé avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getAllDossiers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dossiers = yield DossierClientServices_1.DossierClientService.getAll();
                res.status(200).json(dossiers);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
}
exports.DossierClientController = DossierClientController;
