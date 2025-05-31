"use strict";
/**
 * @file document.service.ts
 * @description Service de gestion des documents dans Firestore.
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
exports.DocumentService = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const Document_1 = require("../models/Document");
const collectionName = 'documents';
class DocumentService {
    /**
     * Crée un nouveau document dans Firestore.
     */
    static create(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield firebase_admin_1.db.collection(collectionName).add(document.toFirestore());
            return docRef.id;
        });
    }
    /**
     * Récupère un document par son ID.
     */
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield firebase_admin_1.db.collection(collectionName).doc(id).get();
            if (!doc.exists)
                return null;
            const data = doc.data();
            return new Document_1.Document(data.type, data.nom, data.contenu, data.dateAjout.toDate());
        });
    }
    /**
     * Met à jour un document.
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_admin_1.db.collection(collectionName).doc(id).update(data);
        });
    }
    /**
     * Supprime un document.
     */
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_admin_1.db.collection(collectionName).doc(id).delete();
        });
    }
    /**
     * Récupère tous les documents.
     */
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield firebase_admin_1.db.collection(collectionName).get();
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return new Document_1.Document(data.type, data.nom, data.contenu, data.dateAjout.toDate());
            });
        });
    }
}
exports.DocumentService = DocumentService;
