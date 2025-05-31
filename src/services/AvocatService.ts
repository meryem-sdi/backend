import { admindb } from '../config/firebase-admin';
import { Avocat } from '../models/Avocat';
import { StatutUtilisateur } from '../models/Utilisateur';

const collection = admindb.collection('Avocats');

export class AvocatService {
  static async create(data: any) {
      // Vérifier si un client avec cet email existe déjà
    const existingAvocat = await AvocatService.getByEmail(data.email);
    if (existingAvocat) {
      throw new Error('Un compte avec cet email existe déjà.');
  }

    const avocat = new Avocat(
      data.nom,
      data.prenom,
      data.email,
      data.motDePasse,
      data.etat as StatutUtilisateur,
      data.specialite,
    );
    const docRef = await collection.add(avocat.toFirestore());
    return { id: docRef.id, ...avocat };
  }

  static async getAll() {
    const snapshot = await collection.where('type', '==', 'Avocat').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id: string) {
    const doc = await collection.doc(id).get();
    if (!doc.exists || doc.data()?.type !== 'Avocat') throw new Error('Avocat non trouvé');
    return { id: doc.id, ...doc.data() };
  }

  static async update(id: string, data: Partial<Avocat>) {
    await collection.doc(id).update(data);
    return { id, ...data };
  }

  static async delete(id: string) {
    await collection.doc(id).delete();
    return { success: true };
  }
 static async getByEmail(email: string) {
    const snapshot = await collection.where('email', '==', email).limit(1).get();
  
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  }

}
