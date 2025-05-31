/**
 * @file document.service.ts
 * @description Service de gestion des documents dans Firestore.
 */

import { admindb } from '../config/firebase-admin';
import { Document } from '../models/Document';
import { DocumentData } from 'firebase-admin/firestore';

const collectionName = 'documents';

export class DocumentService {
  /**
   * Crée un nouveau document dans Firestore.
   */
  static async create(document: Document): Promise<string> {
    const docRef = await admindb.collection(collectionName).add(document.toFirestore());
    return docRef.id;
  }

  /**
   * Récupère un document par son ID.
   */
  static async getById(id: string): Promise<Document | null> {
    const doc = await admindb.collection(collectionName).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data() as DocumentData;

    return new Document(
      data.type,
      data.nom,
      data.contenu,
      data.dateAjout.toDate(),
    );
  }

  /**
   * Met à jour un document.
   */
  static async update(id: string, data: Partial<Document>): Promise<void> {
    await admindb.collection(collectionName).doc(id).update(data);
  }

  /**
   * Supprime un document.
   */
  static async delete(id: string): Promise<void> {
    await admindb.collection(collectionName).doc(id).delete();
  }

  /**
   * Récupère tous les documents.
   */
  static async getAll(): Promise<Document[]> {
    const snapshot = await admindb.collection(collectionName).get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new Document(
        data.type,
        data.nom,
        data.contenu,
        data.dateAjout.toDate(),
      );
    });
  }
}
