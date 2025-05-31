/**
 * @file ContactService.ts
 * @description Service de gestion des messages de contact dans Firestore.
 */

import { admindb } from '../config/firebase-admin';
import { Contact } from '../models/Contact';
import { Utilisateur } from '../models/Utilisateur';
import { DocumentData } from 'firebase-admin/firestore';

const collectionName = 'contacts';

export class ContactService {
  /**
   * Crée un nouveau message de contact dans Firestore.
   */
  static async create(contact: Contact): Promise<string> {
    const docRef = await admindb.collection(collectionName).add(contact.toFirestore());
    return docRef.id;
  }

  /**
   * Récupère un message de contact par son ID.
   */
  static async getById(id: string): Promise<Contact | null> {
    const doc = await admindb.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as DocumentData;

    return new Contact(
      new Utilisateur(
        data.destinataire.nom,
        data.destinataire.prenom,
        data.destinataire.email,
        data.destinataire.motDePasse,
        data.destinataire.etat
      ),
      new Utilisateur(
        data.source.nom,
        data.source.prenom,
        data.source.email,
        data.source.motDePasse,
        data.source.etat
      ),
      data.message,
      data.dateHeure.toDate(),
      data.lu
    );
  }

  /**
   * Met à jour un message de contact.
   */
  static async update(id: string, data: Partial<Contact>): Promise<void> {
    await admindb.collection(collectionName).doc(id).update(data);
  }

  /**
   * Supprime un message de contact.
   */
  static async delete(id: string): Promise<void> {
    await admindb.collection(collectionName).doc(id).delete();
  }

  /**
   * Récupère tous les messages de contact.
   */
  static async getAll(): Promise<Contact[]> {
    const snapshot = await admindb.collection(collectionName).get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new Contact(
        new Utilisateur(
          data.destinataire.nom,
          data.destinataire.prenom,
          data.destinataire.email,
          data.destinataire.motDePasse,
          data.destinataire.etat
        ),
        new Utilisateur(
          data.source.nom,
          data.source.prenom,
          data.source.email,
          data.source.motDePasse,
          data.source.etat
        ),
        data.message,
        data.dateHeure.toDate(),
        data.lu
      );
    });
  }
}
