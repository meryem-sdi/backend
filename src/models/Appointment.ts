import { Timestamp } from 'firebase-admin/firestore';

/**
 * Représente un rendez-vous dans Firestore.
 */
export interface IAppointment {
  id: string;
  idAvocat: string;
  idClient: string;
  dateHeure: Timestamp;
  statut: 'programmé' | 'terminé' | 'annulé';
  type: 'consultation' | 'suivi' | 'signature';
  notes?: string;
  dateCreation: Timestamp;
} 