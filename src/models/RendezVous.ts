/**
 * @file RendezVous.ts
 * @description Représente un rendez-vous dans le système.
 */



export enum EtatRdv {
    EN_ATTENTE = 'enAttente',
    TERMINE = 'terminé',
    ANNULE='annulé',
    CONFIRME='confirmé',
  }
  
  export class RendezVous {
    dateHeure: Date;
    statut: EtatRdv;
    objet: string;
  
    constructor(dateHeure: Date, statut: EtatRdv, objet: string) {
      this.objet = objet;
      this.dateHeure = dateHeure;
      this.statut = statut;

    }
  
    toFirestore(): object {
      return {
        dateHeure: this.dateHeure,
        statut: this.statut,
        objet:this.objet,

      };
    }
        static fromFirestore(data: FirebaseFirestore.DocumentData):RendezVous{
          return new RendezVous(    
            data.dateHeure.toDate(),
            data.statut as EtatRdv,
            data.objet,   
          );
        }
  }
  