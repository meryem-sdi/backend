"use strict";
/**
 * @file RendezVous.ts
 * @description Représente un rendez-vous dans le système.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendezVous = exports.EtatRdv = void 0;
var EtatRdv;
(function (EtatRdv) {
    EtatRdv["EN_ATTENTE"] = "enAttente";
    EtatRdv["TERMINE"] = "termine";
})(EtatRdv || (exports.EtatRdv = EtatRdv = {}));
class RendezVous {
    constructor(date, heure, statut) {
        this.date = date;
        this.heure = heure;
        this.statut = statut;
    }
    toFirestore() {
        return {
            date: this.date,
            heure: this.heure,
            statut: this.statut,
        };
    }
}
exports.RendezVous = RendezVous;
