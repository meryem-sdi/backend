"use strict";
/**
 * @file cabinet.controller.ts
 * @description Contrôleur Express pour les opérations liées aux cabinets.
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
exports.CabinetController = void 0;
const CabinetService_1 = require("../services/CabinetService");
const Cabinet_1 = require("../models/Cabinet");
const firestore_1 = require("firebase-admin/firestore");
class CabinetController {
    static createCabinet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { adresse, num, nom, email, tel, horaireOuverture, horaireFermeture, localisation, } = req.body;
                const geoPoint = new firestore_1.GeoPoint(localisation.latitude, localisation.longitude);
                const cabinet = new Cabinet_1.Cabinet(adresse, num, nom, email, tel, horaireOuverture, horaireFermeture, geoPoint);
                const id = yield CabinetService_1.CabinetService.create(cabinet);
                res.status(201).json({ id, message: 'Cabinet créé avec succès.' });
            }
            catch (error) {
                console.error('Erreur lors de la création du cabinet :', error);
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getCabinetById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cabinet = yield CabinetService_1.CabinetService.getById(id);
                if (!cabinet) {
                    res.status(404).json({ message: 'Cabinet non trouvé.' });
                    return;
                }
                res.status(200).json(cabinet);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static updateCabinet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                if (data.localisation) {
                    data.localisation = new firestore_1.GeoPoint(data.localisation.latitude, data.localisation.longitude);
                }
                yield CabinetService_1.CabinetService.update(id, data);
                res.status(200).json({ message: 'Cabinet mis à jour avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static deleteCabinet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield CabinetService_1.CabinetService.delete(id);
                res.status(200).json({ message: 'Cabinet supprimé avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getAllCabinets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cabinets = yield CabinetService_1.CabinetService.getAll();
                res.status(200).json(cabinets);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
}
exports.CabinetController = CabinetController;
