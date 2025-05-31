import { db } from '../config/firebase';
import admin from 'firebase-admin';
import { IAppointment } from '../models/Appointment';

const COLLECTION = 'appointments';

/**
 * Créer un nouveau rendez-vous dans Firestore.
 */
export async function createAppointment(data: Partial<IAppointment>): Promise<IAppointment> {
  const payload: any = {
    idAvocat: data.idAvocat,
    idClient: data.idClient,
    dateHeure: admin.firestore.Timestamp.fromDate(new Date(data.dateHeure as any)),
    type: data.type,
    statut: data.statut || 'programmé',
    dateCreation: admin.firestore.FieldValue.serverTimestamp(),
  };
  if (data.notes) {
    payload.notes = data.notes;
  }

  const docRef = await db.collection(COLLECTION).add(payload);
  const docSnap = await docRef.get();
  const data = docSnap.data() as IAppointment;
  return { ...data, id: docRef.id };
}

/**
 * Récupérer tous les rendez-vous pour un utilisateur donné, en fonction de son rôle.
 * Éventuellement filtrés par plage de dates (dateFrom, dateTo en chaînes ISO).
 */
export async function getAppointmentsForUser(
  uid: string,
  role: string,
  dateFrom?: string,
  dateTo?: string
): Promise<IAppointment[]> {
  let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = db.collection(COLLECTION);

  if (role === 'avocat') {
    query = query.where('idAvocat', '==', uid);
  } else if (role === 'client') {
    query = query.where('idClient', '==', uid);
  } else if (role === 'admin' || role === 'secretaire') {
    // pas de filtre additionnel
  } else {
    return [];
  }

  // Filtrage par date (optionnel)
  if (dateFrom) {
    const fromTs = admin.firestore.Timestamp.fromDate(new Date(dateFrom));
    query = query.where('dateHeure', '>=', fromTs);
  }
  if (dateTo) {
    const toTs = admin.firestore.Timestamp.fromDate(new Date(dateTo));
    query = query.where('dateHeure', '<=', toTs);
  }

  // Tri par dateHeure ascendant
  const snapshot = await query.orderBy('dateHeure', 'asc').get();
  const result: IAppointment[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data() as IAppointment;
    result.push({ ...data, id: doc.id });
  });
  return result;
}

/**
 * Récupérer un seul rendez-vous par son ID.
 */
export async function getAppointmentById(appointmentId: string): Promise<IAppointment | null> {
  const docSnap = await db.collection(COLLECTION).doc(appointmentId).get();
  if (!docSnap.exists) {
    return null;
  }
  const data = docSnap.data() as IAppointment;
  return { ...data, id: docSnap.id };
}

/**
 * Mettre à jour un rendez-vous existant.
 */
export async function updateAppointment(appointmentId: string, updates: Partial<IAppointment>): Promise<void> {
  const payload: any = {};

  if (updates.dateHeure !== undefined) {
    payload.dateHeure = admin.firestore.Timestamp.fromDate(new Date(updates.dateHeure as any));
  }
  if (updates.type !== undefined) {
    payload.type = updates.type;
  }
  if (updates.statut !== undefined) {
    payload.statut = updates.statut;
  }
  if (updates.notes !== undefined) {
    payload.notes = updates.notes;
  }

  // Vous pourriez suivre une date de mise à jour, si besoin
  payload.dateMiseAJour = admin.firestore.FieldValue.serverTimestamp();

  await db.collection(COLLECTION).doc(appointmentId).update(payload);
}

/**
 * Supprimer un rendez-vous.
 */
export async function deleteAppointment(appointmentId: string): Promise<void> {
  await db.collection(COLLECTION).doc(appointmentId).delete();
} 