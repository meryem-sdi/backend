"use strict";
/**
 * @file calendrier.service.ts
 * @description Service Firestore pour la gestion du calendrier.
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
exports.CalendrierService = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const Calendrier_1 = require("../models/Calendrier");
const collectionName = 'calendrier';
class CalendrierService {
    static create(cal) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield firebase_admin_1.db.collection(collectionName).add(cal.toFirestore());
            return docRef.id;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield firebase_admin_1.db.collection(collectionName).doc(id).get();
            if (!doc.exists)
                return null;
            const data = doc.data();
            return new Calendrier_1.Calendrier(data.date.toDate(), data.heureDebut, data.heureFin, data.statuts);
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
                return new Calendrier_1.Calendrier(data.date.toDate(), data.heureDebut, data.heureFin, data.statuts);
            });
        });
    }
}
exports.CalendrierService = CalendrierService;
