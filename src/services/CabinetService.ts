/**
 * @file cabinet.service.ts
 * @description Service de gestion des cabinets dans Firestore.
 */

import { admindb } from '../config/firebase-admin';
import { Cabinet } from '../models/Cabinet';
import { GeoPoint, DocumentData } from 'firebase-admin/firestore';

const collectionName = 'cabinets';

export class CabinetService {
  /**
   * Crée un nouveau cabinet dans Firestore.
   */
  static async create(cabinet: Cabinet): Promise<string> {
    const docRef = await admindb.collection(collectionName).add(cabinet.toFirestore());
    return docRef.id;
  }

  /**
   * Récupère un cabinet par son identifiant.
   */
  static async getById(id: string): Promise<Cabinet | null> {
    const doc = await admindb.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as DocumentData;

    return new Cabinet(
      data.adresse,
      data.num,
      data.nom,
      data.email,
      data.tel,
      data.horaireOuverture,
      data.horaireFermeture,
      new GeoPoint(data.localisation._latitude, data.localisation._longitude),
    );
  }

  /**
   * Met à jour un cabinet existant.
   */
  static async update(id: string, data: Partial<Cabinet>): Promise<void> {
    await admindb.collection(collectionName).doc(id).update(data);
  }

  /**
   * Supprime un cabinet.
   */
  static async delete(id: string): Promise<void> {
    await admindb.collection(collectionName).doc(id).delete();
  }

  /**
   * Liste tous les cabinets.
   */
  static async getAll(): Promise<Cabinet[]> {
    const snapshot = await admindb.collection(collectionName).get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new Cabinet(
        data.adresse,
        data.num,
        data.nom,
        data.email,
        data.tel,
        data.horaireOuverture,
        data.horaireFermeture,
        new GeoPoint(data.localisation._latitude, data.localisation._longitude),
      );
    });
  }
}
