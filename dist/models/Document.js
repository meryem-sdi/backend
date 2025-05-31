"use strict";
/**
 * @file Document.ts
 * @description Représente un document ajouté dans le système.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
class Document {
    constructor(type, nom, contenu, dateAjout) {
        this.type = type;
        this.nom = nom;
        this.contenu = contenu;
        this.dateAjout = dateAjout;
    }
    toFirestore() {
        return {
            type: this.type,
            nom: this.nom,
            contenu: this.contenu,
            dateAjout: this.dateAjout,
        };
    }
}
exports.Document = Document;
