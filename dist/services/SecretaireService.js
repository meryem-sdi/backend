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
exports.SecretaireService = void 0;
const firebase_admin_1 = require("../config/firebase-admin");
const Secretaire_1 = require("../models/Secretaire");
const collection = firebase_admin_1.db.collection('utilisateur');
class SecretaireService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const secretaire = new Secretaire_1.Secretaire(data.nom, data.prenom, data.email, data.motDePasse, data.etat, data.bureau);
            const docRef = yield collection.add(secretaire.toFirestore());
            return Object.assign({ id: docRef.id }, secretaire);
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield collection.where('type', '==', 'Secretaire').get();
            return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const doc = yield collection.doc(id).get();
            if (!doc.exists || ((_a = doc.data()) === null || _a === void 0 ? void 0 : _a.type) !== 'Secretaire')
                throw new Error('Secretaire non trouvé');
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
exports.SecretaireService = SecretaireService;
