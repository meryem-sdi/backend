import { admindb } from '../config/firebase-admin';
import { Utilisateur, StatutUtilisateur } from '../models/Utilisateur';


const collection = admindb.collection('utilisateur');

export class UtilisateurService {
  static async create(data: any) {
    const utilisateur = new Utilisateur(
      data.nom,
      data.prenom,
      data.email,
      data.motDePasse,
      data.etat as StatutUtilisateur
    );

    const docRef = await collection.add(utilisateur.toFirestore());
    return { id: docRef.id, ...utilisateur };
  }

  static async getAll() {
    const snapshot = await collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id: string) {
    const doc = await collection.doc(id).get();
    if (!doc.exists) throw new Error('Utilisateur non trouvé');
    return { id: doc.id, ...doc.data() };
  }

  static async getByNom(nom: string) {
    const doc = await collection.doc(nom).get();
   if (!doc.exists) throw new Error('Utilisateur non trouvé');
    return { id: doc.id, ...doc.data() };
  }

  static async update(id: string, data: Partial<Utilisateur>) {
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

  static async getByNomPrenom(nom: string, prenom: string): Promise<Utilisateur | null> {
    const snapshot = await admindb.collection('utilisateur')
      .where('nom', '==', nom)
      .where('prenom', '==', prenom)
      .limit(1)
      .get();
  
    if (snapshot.empty) return null;
  
    const doc = snapshot.docs[0];
    const data = doc.data();
    return new Utilisateur(data.nom, data.prenom, data.email, data.motDePasse, data.etat);
  }
}
