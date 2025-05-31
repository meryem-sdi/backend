/**
 * @file rendezvous.service.ts
 * @description Service pour la gestion des rendez-vous dans Firestore.
 */

import { admindb } from '../config/firebase-admin';
import { RendezVous, EtatRdv } from '../models/RendezVous';
import { DocumentData } from 'firebase-admin/firestore';

const collectionName = 'rendezvous';

export class RendezVousService {
  static async create(rdv: RendezVous): Promise<string> {
    const docRef = await admindb.collection(collectionName).add(rdv.toFirestore());
    return docRef.id;
  }

  static async getById(id: string): Promise<RendezVous | null> {
    const doc = await admindb.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as DocumentData;

    return new RendezVous(
      data.dateHeure.toDate(),
      data.statut as EtatRdv,
      data.objet,
    );
  }

  static async update(id: string, data: Partial<RendezVous>): Promise<void> {
    await admindb.collection(collectionName).doc(id).update(data);
  }

  static async delete(id: string): Promise<void> {
    await admindb.collection(collectionName).doc(id).delete();
  }

  static async getAll(): Promise<RendezVous[]> {
    const snapshot = await admindb.collection(collectionName).get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new RendezVous(
        data.dateHeure.toDate(),
        data.statut as EtatRdv,
        data.objet,
      );
    });
  }
}
