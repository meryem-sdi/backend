"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secretaire = void 0;
const Utilisateur_1 = require("./Utilisateur");
/**
 * @class Secretaire
 * Représente une secrétaire, héritant de Utilisateur.
 */
class Secretaire extends Utilisateur_1.Utilisateur {
    constructor(nom, prenom, email, motDePasse, etat, bureau) {
        super(nom, prenom, email, motDePasse, etat);
        this.bureau = bureau;
    }
    toFirestore() {
        return Object.assign(Object.assign({}, super.toFirestore()), { bureau: this.bureau, type: 'Secretaire' });
    }
}
exports.Secretaire = Secretaire;
