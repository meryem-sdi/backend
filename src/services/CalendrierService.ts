/**
 * @file calendrier.service.ts
 * @description Service Firestore pour la gestion du calendrier.
 */

import { admindb } from '../config/firebase-admin';
import { Calendrier } from '../models/Calendrier';
import { DocumentData } from 'firebase-admin/firestore';

const collectionName = 'calendrier';

export class CalendrierService {
  static async create(cal: Calendrier): Promise<string> {
    const docRef = await admindb.collection(collectionName).add(cal.toFirestore());
    return docRef.id;
  }

  static async getById(id: string): Promise<Calendrier | null> {
    const doc = await admindb.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as DocumentData;

    return new Calendrier(
      data.date.toDate(),
      data.heureDebut,
      data.heureFin,
      data.statuts,
    );
  }

  static async update(id: string, data: Partial<Calendrier>): Promise<void> {
    await admindb.collection(collectionName).doc(id).update(data);
  }

  static async delete(id: string): Promise<void> {
    await admindb.collection(collectionName).doc(id).delete();
  }

  static async getAll(): Promise<Calendrier[]> {
    const snapshot = await admindb.collection(collectionName).get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new Calendrier(
        data.date.toDate(),
        data.heureDebut,
        data.heureFin,
        data.statuts,
      );
    });
  }
}
