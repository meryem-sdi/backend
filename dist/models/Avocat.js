"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avocat = void 0;
const Utilisateur_1 = require("./Utilisateur");
/**
 * @class Avocat
 * Représente un avocat, héritant de Utilisateur.
 */
class Avocat extends Utilisateur_1.Utilisateur {
    constructor(nom, prenom, email, motDePasse, etat, specialite) {
        super(nom, prenom, email, motDePasse, etat);
        this.specialite = specialite;
    }
    toFirestore() {
        return Object.assign(Object.assign({}, super.toFirestore()), { specialite: this.specialite, type: 'Avocat' });
    }
}
exports.Avocat = Avocat;
