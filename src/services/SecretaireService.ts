import { admindb } from '../config/firebase-admin';
import { Secretaire } from '../models/Secretaire';
import { StatutUtilisateur } from '../models/Utilisateur';

const collection = admindb.collection('Secretaires');

export class SecretaireService {
  static async create(data: any) {
      // Vérifier si un client avec cet email existe déjà
    const existingSecretaire = await SecretaireService.getByEmail(data.email);
    if (existingSecretaire) {
      throw new Error('Un compte avec cet email existe déjà.');
    }

    const secretaire = new Secretaire(
      data.nom,
      data.prenom,
      data.email,
      data.motDePasse,
      data.etat as StatutUtilisateur,
    );

    const docRef = await collection.add(secretaire.toFirestore());
    return { id: docRef.id, ...secretaire };
  }

  static async getAll() {
    const snapshot = await collection.where('type', '==', 'Secretaire').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id: string) {
    const doc = await collection.doc(id).get();
    if (!doc.exists || doc.data()?.type !== 'Secretaire') throw new Error('Secretaire non trouvé');
    return { id: doc.id, ...doc.data() };
  }

  static async update(id: string, data: Partial<Secretaire>) {
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
