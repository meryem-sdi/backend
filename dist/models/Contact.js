"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const firestore_1 = require("firebase-admin/firestore");
/**
 * Représente un message de contact entre deux utilisateurs.
 */
class Contact {
    constructor(destinataire, source, message, date, heure, lu = false) {
        this.destinataire = destinataire;
        this.source = source;
        this.message = message;
        this.date = date;
        this.heure = heure;
        this.lu = lu;
    }
    /**
     * Convertit l'objet en format Firestore.
     * @returns Objet prêt à être sauvegardé dans Firestore.
     */
    toFirestore() {
        return {
            destinataire: this.destinataire.toFirestore(),
            source: this.source.toFirestore(),
            message: this.message,
            date: firestore_1.Timestamp.fromDate(this.date),
            heure: this.heure,
            lu: this.lu,
        };
    }
}
exports.Contact = Contact;
