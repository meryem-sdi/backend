"use strict";
/**
 * @file Cabinet.ts
 * @description Représente un cabinet d’avocat.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cabinet = void 0;
/**
 * Classe représentant un Cabinet.
 */
class Cabinet {
    constructor(adresse, num, nom, email, tel, horaireOuverture, horaireFermeture, localisation) {
        this.adresse = adresse;
        this.num = num;
        this.nom = nom;
        this.email = email;
        this.tel = tel;
        this.horaireOuverture = horaireOuverture;
        this.horaireFermeture = horaireFermeture;
        this.localisation = localisation;
    }
    toFirestore() {
        return {
            adresse: this.adresse,
            num: this.num,
            nom: this.nom,
            email: this.email,
            tel: this.tel,
            horaireOuverture: this.horaireOuverture,
            horaireFermeture: this.horaireFermeture,
            localisation: this.localisation,
        };
    }
}
exports.Cabinet = Cabinet;
