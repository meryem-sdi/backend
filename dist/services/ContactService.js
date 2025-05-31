"use strict";
/**
 * @file ContactService.ts
 * @description Service de gestion des messages de contact dans Firestore.
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
exports.ContactService = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const Contact_1 = require("../models/Contact");
const Utilisateur_1 = require("../models/Utilisateur");
const collectionName = 'contacts';
class ContactService {
    /**
     * Crée un nouveau message de contact dans Firestore.
     */
    static create(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield firebase_admin_1.db.collection(collectionName).add(contact.toFirestore());
            return docRef.id;
        });
    }
    /**
     * Récupère un message de contact par son ID.
     */
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield firebase_admin_1.db.collection(collectionName).doc(id).get();
            if (!doc.exists)
                return null;
            const data = doc.data();
            return new Contact_1.Contact(new Utilisateur_1.Utilisateur(data.destinataire.nom, data.destinataire.prenom, data.destinataire.email, data.destinataire.motDePasse, data.destinataire.etat), new Utilisateur_1.Utilisateur(data.source.nom, data.source.prenom, data.source.email, data.source.motDePasse, data.source.etat), data.message, data.date.toDate(), data.heure, data.lu);
        });
    }
    /**
     * Met à jour un message de contact.
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_admin_1.db.collection(collectionName).doc(id).update(data);
        });
    }
    /**
     * Supprime un message de contact.
     */
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_admin_1.db.collection(collectionName).doc(id).delete();
        });
    }
    /**
     * Récupère tous les messages de contact.
     */
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield firebase_admin_1.db.collection(collectionName).get();
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return new Contact_1.Contact(new Utilisateur_1.Utilisateur(data.destinataire.nom, data.destinataire.prenom, data.destinataire.email, data.destinataire.motDePasse, data.destinataire.etat), new Utilisateur_1.Utilisateur(data.source.nom, data.source.prenom, data.source.email, data.source.motDePasse, data.source.etat), data.message, data.date.toDate(), data.heure, data.lu);
            });
        });
    }
}
exports.ContactService = ContactService;
