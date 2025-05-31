import { admindb } from '../config/firebase-admin';
import { Client } from '../models/Client';
import { StatutUtilisateur } from '../models/Utilisateur';


const collection = admindb.collection('Clients');

export class ClientService {
  static async create(data: any) {
    // Vérifier si un client avec cet email existe déjà
    const existingClient = await ClientService.getByEmail(data.email);
    if (existingClient) {
      throw new Error('Un compte avec cet email existe déjà.');
    }

    const client = new Client(
      data.nom,
      data.prenom,
      data.email,
      data.motDePasse,
      data.etat as StatutUtilisateur,
    );
    const docRef = await collection.add(client.toFirestore());
    return { id: docRef.id, ...client };
  }

  static async getAll() {
    const snapshot = await collection.where('type', '==', 'Client').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async getById(id: string) {
    const doc = await collection.doc(id).get();
    if (!doc.exists || doc.data()?.type !== 'Client') throw new Error('Client non trouvé');
    return { id: doc.id, ...doc.data() };
  }

  static async update(id: string, data: Partial<Client>) {
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
