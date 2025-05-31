"use strict";
/**
 * @file ContactController.ts
 * @description Contrôleur Express pour les messages de contact.
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
exports.ContactController = void 0;
const ContactService_1 = require("../services/ContactService");
const Contact_1 = require("../models/Contact");
const Utilisateur_1 = require("../models/Utilisateur");
class ContactController {
    static createContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { destinataire, source, message, date, heure, lu } = req.body;
                const destinataireUser = new Utilisateur_1.Utilisateur(destinataire.nom, destinataire.prenom, destinataire.email, destinataire.motDePasse, destinataire.etat);
                const sourceUser = new Utilisateur_1.Utilisateur(source.nom, source.prenom, source.email, source.motDePasse, source.etat);
                const contact = new Contact_1.Contact(destinataireUser, sourceUser, message, new Date(date), heure, lu);
                const id = yield ContactService_1.ContactService.create(contact);
                res.status(201).json({ id, message: 'Message envoyé avec succès.' });
            }
            catch (error) {
                console.error('Erreur lors de la création du message :', error);
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getContactById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const contact = yield ContactService_1.ContactService.getById(id);
                if (!contact) {
                    res.status(404).json({ message: 'Message non trouvé.' });
                    return;
                }
                res.status(200).json(contact);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static updateContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                yield ContactService_1.ContactService.update(id, data);
                res.status(200).json({ message: 'Message mis à jour avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static deleteContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield ContactService_1.ContactService.delete(id);
                res.status(200).json({ message: 'Message supprimé avec succès.' });
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
    static getAllContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = yield ContactService_1.ContactService.getAll();
                res.status(200).json(contacts);
            }
            catch (error) {
                res.status(500).json({ message: 'Erreur serveur.' });
            }
        });
    }
}
exports.ContactController = ContactController;
