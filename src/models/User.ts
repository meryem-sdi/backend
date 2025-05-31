import { Timestamp } from 'firebase-admin/firestore';

/**
 * Profil utilisateur stocké en Firestore (collection "users").
 * Le mot de passe n'est pas stocké ici : c'est géré par Firebase Auth.
 */
export interface IUser {
  id: string;                         // Firestore ID = same as Firebase Auth UID
  email: string;
  prenom: string;
  nom: string;
  role: 'client' | 'avocat' | 'secretaire' | 'admin';
  dateCreation: Timestamp;
  dateMiseAJour: Timestamp;           // Date de dernière mise à jour du profil
  // (eventuellement d'autres champs : téléphone, adresse, avatarURL…)
} 