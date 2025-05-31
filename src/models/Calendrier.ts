/**
 * @file Calendrier.ts
 * @description Modèle représentant une entrée de calendrier.
 */

export enum estDisponible {
  DISPONIBLE = 'Disponible',
  indisponible = 'Indisponible'
}

export class Calendrier {

    date: Date;
    heureDebut: string;
    heureFin: string;
    statuts: estDisponible;
  
    constructor(date: Date, heureDebut: string, heureFin: string, statuts: estDisponible, ) {
      this.date = date;
      this.heureDebut = heureDebut;
      this.heureFin = heureFin;
      this.statuts = statuts;
    }
  
    toFirestore(): object {
      return {
        date: this.date,
        heureDebut: this.heureDebut,
        heureFin: this.heureFin,
        statuts: this.statuts,
      };
    }
    static fromFirestore(data: FirebaseFirestore.DocumentData): Calendrier {
      return new Calendrier(
        data.date,
        data.heureDebut,
        data.heureFin,
        data.statuts as estDisponible,
      );
    }
  }
  