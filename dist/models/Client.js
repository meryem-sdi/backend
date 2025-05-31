"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const Utilisateur_1 = require("./Utilisateur");
/**
 * @class Client
 * Représente un client, héritant de Utilisateur.
 */
class Client extends Utilisateur_1.Utilisateur {
    constructor(nom, prenom, email, motDePasse, etat, cin) {
        super(nom, prenom, email, motDePasse, etat);
        this.cin = cin;
    }
    toFirestore() {
        return Object.assign(Object.assign({}, super.toFirestore()), { cin: this.cin, type: 'Client' });
    }
}
exports.Client = Client;
