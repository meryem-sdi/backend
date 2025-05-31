// src/services/StatistiquesService.ts

import { admindb } from "../config/firebase-admin";

export class StatistiquesService {
  private static statsRef = admindb .collection("statistiques").doc("compteurs");

  //  Incrémente un compteur 

  static async incrementCounter(counterName: string, step: number = 1) {
    await admindb .runTransaction(async (transaction) => {
      const doc = await transaction.get(this.statsRef);
      const data = doc.exists ? doc.data()! : {};

      const current = data[counterName] || 0;
      transaction.set(this.statsRef, {
        ...data,
        [counterName]: current + step
      }, { merge: true });
    });
  }

  //Décrémente un compteur

  static async decrementCounter(counterName: string, step: number = 1) {
    return this.incrementCounter(counterName, -step);
  }

  //  Récupère tous les compteurs
  
  static async getCounters() {
    const doc = await this.statsRef.get();
    return doc.exists ? doc.data() : {};
  }

    // ✅ Méthode dynamique pour compter les documents d'une collection Firestore
    static async countDocumentsFromFirestore(collectionName: string): Promise<number> {
      const snapshot = await admindb.collection(collectionName).get();
      return snapshot.size;
    }
}
