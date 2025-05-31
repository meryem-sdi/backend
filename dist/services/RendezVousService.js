"use strict";
/**
 * @file rendezvous.service.ts
 * @description Service pour la gestion des rendez-vous dans Firestore.
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
exports.RendezVousService = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const RendezVous_1 = require("../models/RendezVous");
const collectionName = 'rendezvous';
class RendezVousService {
    static create(rdv) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield firebase_admin_1.db.collection(collectionName).add(rdv.toFirestore());
            return docRef.id;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield firebase_admin_1.db.collection(collectionName).doc(id).get();
            if (!doc.exists)
                return null;
            const data = doc.data();
            return new RendezVous_1.RendezVous(data.date.toDate(), data.heure, data.statut);
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_admin_1.db.collection(collectionName).doc(id).update(data);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebase_admin_1.db.collection(collectionName).doc(id).delete();
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield firebase_admin_1.db.collection(collectionName).get();
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return new RendezVous_1.RendezVous(data.date.toDate(), data.heure, data.statut);
            });
        });
    }
}
exports.RendezVousService = RendezVousService;
