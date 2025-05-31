"use strict";
/**
 * @file Calendrier.ts
 * @description Modèle représentant une entrée de calendrier.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendrier = void 0;
class Calendrier {
    constructor(date, heureDebut, heureFin, statuts) {
        this.date = date;
        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
        this.statuts = statuts;
    }
    toFirestore() {
        return {
            date: this.date,
            heureDebut: this.heureDebut,
            heureFin: this.heureFin,
            statuts: this.statuts,
        };
    }
}
exports.Calendrier = Calendrier;
