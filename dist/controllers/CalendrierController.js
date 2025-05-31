"use strict";
/**
 * @file calendrier.controller.ts
 * @description Contrôleur Express pour la gestion du calendrier.
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
exports.CalendrierController = void 0;
const CalendrierService_1 = require("../services/CalendrierService");
const Calendrier_1 = require("../models/Calendrier");
class CalendrierController {
    static createCalendrier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, heureDebut, heureFin, statuts } = req.body;
                const cal = new Calendrier_1.Calendrier(new Date(date), heureDebut, heureFin, statuts);
                const id = yield CalendrierService_1.CalendrierService.create(cal);
                res.status(201).json({ id, message: 'Créneau ajouté au calendrier.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getCalendrierById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cal = yield CalendrierService_1.CalendrierService.getById(id);
                if (!cal) {
                    res.status(404).json({ message: 'Créneau non trouvé.' });
                    return;
                }
                res.status(200).json(cal);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static updateCalendrier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                yield CalendrierService_1.CalendrierService.update(id, data);
                res.status(200).json({ message: 'Créneau mis à jour.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static deleteCalendrier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield CalendrierService_1.CalendrierService.delete(id);
                res.status(200).json({ message: 'Créneau supprimé.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getAllCalendriers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const calendriers = yield CalendrierService_1.CalendrierService.getAll();
                res.status(200).json(calendriers);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
}
exports.CalendrierController = CalendrierController;
