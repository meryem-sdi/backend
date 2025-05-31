"use strict";
/**
 * @file dossierclient.service.ts
 * @description Service de gestion des Dossiers Clients dans Firestore.
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
exports.DossierClientService = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const DossierClient_1 = require("../models/DossierClient");
const collectionName = 'dossiers';
class DossierClientService {
    /**
     * Crée un nouveau dossier client dans Firestore.
     */
    static create(dossier) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield firebase_admin_1.db.collection(collectionName).add(dossier.toFirestore());
            return docRef.id;
        });
    }
    /**
     * Récupère un dossier par son ID.
     */
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield firebase_admin_1.db.collection(collectionName).doc(id).get();
            if (!doc.exists)
                return null;
            const data = doc.data();
            return new DossierClient_1.DossierClient(data.description, data.statut);
        });
    }
    /**
     * Met à jour un dossier client existant.
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_admin_1.db.collection(collectionName).doc(id).update(data);
        });
    }
    /**
     * Supprime un dossier client.
     */
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_admin_1.db.collection(collectionName).doc(id).delete();
        });
    }
    /**
     * Récupère tous les dossiers clients.
     */
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield firebase_admin_1.db.collection(collectionName).get();
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return new DossierClient_1.DossierClient(data.description, data.statut);
            });
        });
    }
}
exports.DossierClientService = DossierClientService;
