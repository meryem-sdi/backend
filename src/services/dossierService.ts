import { db } from '../config/firebase';
import admin from 'firebase-admin';
import { IDossier } from '../models/Dossier';

const COLLECTION = 'dossiers';

/**
 * Créer un nouveau document "dossier" dans Firestore.
 */
export async function createDossier(data: Partial<IDossier>): Promise<IDossier> {
  const dossierPayload: any = {
    titre: data.titre,
    description: data.description,
    idAvocat: data.idAvocat,
    idClient: data.idClient,
    statut: data.statut || 'en_cours',
    dateCreation: admin.firestore.FieldValue.serverTimestamp(),
  };

  if (data.dateLimite) {
    dossierPayload.dateLimite = admin.firestore.Timestamp.fromDate(new Date(data.dateLimite as any));
  }

  const docRef = await db.collection(COLLECTION).add(dossierPayload);
  const docSnap = await docRef.get();
  const dossierData = docSnap.data() as IDossier;
  return { ...dossierData, id: docRef.id };
}

/**
 * Récupérer tous les dossiers accessibles à un utilisateur, 
 * en option filtré par statut.
 */
export async function getDossiersByUser(
  uid: string,
  role: string,
  statut?: string
): Promise<IDossier[]> {
  let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = db.collection(COLLECTION);

  if (role === 'avocat') {
    query = query.where('idAvocat', '==', uid);
  } else if (role === 'client') {
    query = query.where('idClient', '==', uid);
  }

  if (statut) {
    query = query.where('statut', '==', statut);
  }

  const snapshot = await query.orderBy('dateCreation', 'desc').get();
  const result: IDossier[] = [];
  snapshot.forEach((doc) => {
    const dossierData = doc.data() as IDossier;
    result.push({ ...dossierData, id: doc.id });
  });
  return result;
}

/**
 * Récupérer un seul dossier par son ID.
 */
export async function getDossierById(dossierId: string): Promise<IDossier | null> {
  const docSnap = await db.collection(COLLECTION).doc(dossierId).get();
  if (!docSnap.exists) return null;
  const dossierData = docSnap.data() as IDossier;
  return { ...dossierData, id: docSnap.id };
}

/**
 * Mettre à jour un dossier existant.
 */
export async function updateDossier(dossierId: string, updates: Partial<IDossier>): Promise<void> {
  const updatePayload: any = {};

  if (updates.titre !== undefined) {
    updatePayload.titre = updates.titre;
  }
  if (updates.description !== undefined) {
    updatePayload.description = updates.description;
  }
  if (updates.idAvocat !== undefined) {
    updatePayload.idAvocat = updates.idAvocat;
  }
  if (updates.idClient !== undefined) {
    updatePayload.idClient = updates.idClient;
  }
  if (updates.statut !== undefined) {
    updatePayload.statut = updates.statut;
  }
  if (updates.dateLimite !== undefined) {
    updatePayload.dateLimite = admin.firestore.Timestamp.fromDate(new Date(updates.dateLimite as any));
  }

  updatePayload.dateMiseAJour = admin.firestore.FieldValue.serverTimestamp();

  await db.collection(COLLECTION).doc(dossierId).update(updatePayload);
}

/**
 * Supprimer un dossier.
 */
export async function deleteDossier(dossierId: string): Promise<void> {
  await db.collection(COLLECTION).doc(dossierId).delete();
} 