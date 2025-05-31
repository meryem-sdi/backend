"use strict";
/**
 * @file DossierClient.ts
 * @description Représente un dossier client dans le cabinet.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DossierClient = exports.EtatDossier = void 0;
/**
 * Enumération des états possibles d’un dossier.
 */
var EtatDossier;
(function (EtatDossier) {
    EtatDossier["EN_COURS"] = "enCours";
    EtatDossier["EN_ATTENTE"] = "enAttente";
    EtatDossier["ARCHIVE"] = "archive";
})(EtatDossier || (exports.EtatDossier = EtatDossier = {}));
/**
 * Classe représentant un DossierClient.
 */
class DossierClient {
    constructor(description, statut) {
        this.description = description;
        this.statut = statut;
    }
    toFirestore() {
        return {
            description: this.description,
            statut: this.statut,
        };
    }
}
exports.DossierClient = DossierClient;
