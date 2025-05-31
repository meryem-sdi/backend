"use strict";
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
exports.UtilisateurService = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const Utilisateur_1 = require("../models/Utilisateur");
const collection = firebase_admin_1.db.collection('utilisateur');
class UtilisateurService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const utilisateur = new Utilisateur_1.Utilisateur(data.nom, data.prenom, data.email, data.motDePasse, data.etat);
            const docRef = yield collection.add(utilisateur.toFirestore());
            return Object.assign({ id: docRef.id }, utilisateur);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield collection.get();
            return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield collection.doc(id).get();
            if (!doc.exists)
                throw new Error('Utilisateur non trouvé');
            return Object.assign({ id: doc.id }, doc.data());
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield collection.doc(id).update(data);
            return Object.assign({ id }, data);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield collection.doc(id).delete();
            return { success: true };
        });
    }
}
exports.UtilisateurService = UtilisateurService;
