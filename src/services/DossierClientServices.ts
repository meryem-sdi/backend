/**
 * @file dossierclient.service.ts
 * @description Service de gestion des Dossiers Clients dans Firestore.
 */

import { admindb } from '../config/firebase-admin';
import { DossierClient, EtatDossier } from '../models/DossierClient';
import { DocumentData } from 'firebase-admin/firestore';

const collectionName = 'dossiers';

export class DossierClientService {

  static async create(dossier: DossierClient): Promise<string> {
    const docRef = await admindb.collection(collectionName).add(dossier.toFirestore());
    return docRef.id;
  }


  static async getById(id: string): Promise<DossierClient | null> {
    const doc = await admindb.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as DocumentData;

     return new DossierClient(
       data.description,
       data.statut as EtatDossier,
       data.titre,
       data.type,
       data.dateCreation,
       doc.id
     );
  }


  static async update(id: string, data: Partial<DossierClient>): Promise<void> {
    await admindb.collection(collectionName).doc(id).update(data);
  }


  static async delete(id: string): Promise<void> {
    await admindb.collection(collectionName).doc(id).delete();
  }


  static async getAll(): Promise<DossierClient[]> {
    const snapshot = await admindb.collection(collectionName).get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new DossierClient(
        data.description,
        data.statut as EtatDossier,
        data.titre,
        data.type,
        data.dateCreation,
        doc.id,
      );
    });
  }
}
