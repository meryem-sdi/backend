/**
 * @file facture.service.ts
 * @description Service pour la gestion des factures dans Firestore.
 */

import { admindb } from '../config/firebase-admin';
import { Facture } from '../models/Facture';
import { DocumentData } from 'firebase-admin/firestore';

const collectionName = 'factures';

export class FactureService {
  /**
   * Crée une nouvelle facture.
   */
  static async create(facture: Facture): Promise<string> {
    const docRef = await admindb.collection(collectionName).add(facture.toFirestore());
    return docRef.id;
  }

  /**
   * Récupère une facture par ID.
   */
  static async getById(id: string): Promise<Facture | null> {
    const doc = await admindb.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as DocumentData;

    return new Facture(
      data.montant,
      data.dateEmission.toDate(),
      data.statut,
    );
  }

  /**
   * Met à jour une facture.
   */
  static async update(id: string, data: Partial<Facture>): Promise<void> {
    await admindb.collection(collectionName).doc(id).update(data);
  }

  /**
   * Supprime une facture.
   */
  static async delete(id: string): Promise<void> {
    await admindb.collection(collectionName).doc(id).delete();
  }

  /**
   * Récupère toutes les factures.
   */
  static async getAll(): Promise<Facture[]> {
    const snapshot = await admindb.collection(collectionName).get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new Facture(
        data.montant,
        data.dateEmission.toDate(),
        data.statut,
      );
    });
  }
}
