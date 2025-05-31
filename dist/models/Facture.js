"use strict";
/**
 * @file Facture.ts
 * @description Représente une facture dans le système.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facture = void 0;
class Facture {
    constructor(montant, dateEmission, statut) {
        this.montant = montant;
        this.dateEmission = dateEmission;
        this.statut = statut;
    }
    /**
     * Formate l'objet pour Firestore.
     */
    toFirestore() {
        return {
            montant: this.montant,
            dateEmission: this.dateEmission,
            statut: this.statut,
        };
    }
}
exports.Facture = Facture;
