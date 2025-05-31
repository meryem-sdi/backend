import { Timestamp } from 'firebase-admin/firestore';

/**
 * Représente un dossier juridique dans Firestore.
 */
export interface IDossier {
  id: string;
  titre: string;
  description: string;
  idAvocat: string;
  idClient: string;
  statut: 'en_cours' | 'clos' | 'en_attente';
  dateCreation: Timestamp;
  dateLimite?: Timestamp;
  dateMiseAJour?: Timestamp;
} 