"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrateur = void 0;
const Utilisateur_1 = require("./Utilisateur");
/**
 * @class Administrateur
 * Représente un administrateur, héritant de Utilisateur.
 */
class Administrateur extends Utilisateur_1.Utilisateur {
    constructor(nom, prenom, email, motDePasse, etat, niveauAcces) {
        super(nom, prenom, email, motDePasse, etat);
        this.niveauAcces = niveauAcces;
    }
    toFirestore() {
        return Object.assign(Object.assign({}, super.toFirestore()), { niveauAcces: this.niveauAcces, type: 'Administrateur' });
    }
}
exports.Administrateur = Administrateur;
