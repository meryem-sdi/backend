import { admindb } from '../config/firebase-admin';
import { Administrateur } from '../models/Administrateur';
import { StatutUtilisateur } from '../models/Utilisateur';

const collection = admindb.collection('utilisateur');

export class AdministrateurService {
  static async create(data: any) {
    const admin = new Administrateur(
      data.nom,
      data.prenom,
      data.email,
      data.motDePasse,
      data.etat as StatutUtilisateur,
      data.niveauAcces
    );
    const docRef = await collection.add(admin.toFirestore());
    return { id: docRef.id, ...admin };
  }

  static async getAll() {
    const snapshot = await collection.where('type', '==', 'Administrateur').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id: string) {
    const doc = await collection.doc(id).get();
    if (!doc.exists || doc.data()?.type !== 'Administrateur') throw new Error('Administrateur non trouvé');
    return { id: doc.id, ...doc.data() };
  }

  static async update(id: string, data: Partial<Administrateur>) {
    await collection.doc(id).update(data);
    return { id, ...data };
  }

  static async delete(id: string) {
    await collection.doc(id).delete();
    return { success: true };
  }
}
