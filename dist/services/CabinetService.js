"use strict";
/**
 * @file cabinet.service.ts
 * @description Service de gestion des cabinets dans Firestore.
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
exports.CabinetService = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const Cabinet_1 = require("../models/Cabinet");
const firestore_1 = require("firebase-admin/firestore");
const collectionName = 'cabinets';
class CabinetService {
    /**
     * Crée un nouveau cabinet dans Firestore.
     */
    static create(cabinet) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield firebase_admin_1.db.collection(collectionName).add(cabinet.toFirestore());
            return docRef.id;
        });
    }
    /**
     * Récupère un cabinet par son identifiant.
     */
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield firebase_admin_1.db.collection(collectionName).doc(id).get();
            if (!doc.exists)
                return null;
            const data = doc.data();
            return new Cabinet_1.Cabinet(data.adresse, data.num, data.nom, data.email, data.tel, data.horaireOuverture, data.horaireFermeture, new firestore_1.GeoPoint(data.localisation._latitude, data.localisation._longitude));
        });
    }
    /**
     * Met à jour un cabinet existant.
     */
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_admin_1.db.collection(collectionName).doc(id).update(data);
        });
    }
    /**
     * Supprime un cabinet.
     */
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_admin_1.db.collection(collectionName).doc(id).delete();
        });
    }
    /**
     * Liste tous les cabinets.
     */
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield firebase_admin_1.db.collection(collectionName).get();
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return new Cabinet_1.Cabinet(data.adresse, data.num, data.nom, data.email, data.tel, data.horaireOuverture, data.horaireFermeture, new firestore_1.GeoPoint(data.localisation._latitude, data.localisation._longitude));
            });
        });
    }
}
exports.CabinetService = CabinetService;
