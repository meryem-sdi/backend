/**
 * @file Facture.ts
 * @description Représente une facture dans le système.
 */

export enum StatutFacture {
  PAYEE = 'Payée',
  IMPAYEE = 'Non payée'
}

export class Facture {
    montant: number;
    dateEmission: Date;
    statut: StatutFacture;
  
    constructor(montant: number, dateEmission: Date, statut: StatutFacture,  ) {
      this.montant = montant;
      this.dateEmission = dateEmission;
      this.statut = statut;
    }
  
    /**
     * Formate l'objet pour Firestore.
     */
    toFirestore(): object {
      return {
        montant: this.montant,
        dateEmission: this.dateEmission,
        statut: this.statut,
      };
    }
    static fromFirestore(data: FirebaseFirestore.DocumentData): Facture {
      return new Facture(
        data.montant,     
        data.dateEmission.toDate(),
        data.statut as StatutFacture,   
      );
    }
  }
  