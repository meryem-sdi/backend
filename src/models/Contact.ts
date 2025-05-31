import { Timestamp } from 'firebase-admin/firestore';
import { Utilisateur } from './Utilisateur';

/**
 * Représente un message de contact entre deux utilisateurs.
 */
export class Contact {
  destinataire: Utilisateur;
  source: Utilisateur;
  message: string;
  dateHeure: Date;
  lu: boolean;

  constructor(
    destinataire: Utilisateur,
    source: Utilisateur,
    message: string,
    dateHeure: Date,
    lu: boolean = false
  ) {
    this.destinataire = destinataire;
    this.source = source;
    this.message = message;
    this.dateHeure = dateHeure;
    this.lu = lu;
  }

  /**
   * Convertit l'objet en format Firestore.
   * @returns Objet prêt à être sauvegardé dans Firestore.
   */
  toFirestore(): object {
    return {
      destinataire: this.destinataire.toFirestore(),
      source: this.source.toFirestore(),
      message: this.message,
      dateHeure: Timestamp.fromDate(this.dateHeure),
      lu: this.lu,
    };
  }
    static fromFirestore(data: FirebaseFirestore.DocumentData): Contact {
      return new Contact(
        data.destinataire,
        data.source,
        data.message,
        data.dateHeure,
        data.lu
      );
    }
}
