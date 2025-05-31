"use strict";
/**
 * @file facture.controller.ts
 * @description Contrôleur Express pour la gestion des factures.
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
exports.FactureController = void 0;
const FactureService_1 = require("../services/FactureService");
const Facture_1 = require("../models/Facture");
class FactureController {
    static createFacture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { montant, dateEmission, statut } = req.body;
                const facture = new Facture_1.Facture(montant, new Date(dateEmission), statut);
                const id = yield FactureService_1.FactureService.create(facture);
                res.status(201).json({ id, message: 'Facture créée avec succès.' });
            }
            catch (error) {
                console.error('Erreur création facture :', error);
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getFactureById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const facture = yield FactureService_1.FactureService.getById(id);
                if (!facture) {
                    res.status(404).json({ message: 'Facture non trouvée.' });
                    return;
                }
                res.status(200).json(facture);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static updateFacture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                yield FactureService_1.FactureService.update(id, data);
                res.status(200).json({ message: 'Facture mise à jour avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static deleteFacture(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield FactureService_1.FactureService.delete(id);
                res.status(200).json({ message: 'Facture supprimée avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getAllFactures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const factures = yield FactureService_1.FactureService.getAll();
                res.status(200).json(factures);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
}
exports.FactureController = FactureController;
