/**
 * @file DossierClient.ts
 * @description Représente un dossier client dans le cabinet.
 */


/**
 * Enumération des états possibles d’un dossier.
 */
export enum EtatDossier {
    EN_COURS = 'enCours',
    EN_ATTENTE = 'enAttente',
    ARCHIVE = 'archivé',
  }
  

  export class DossierClient {
    id?:string
    titre:string;
    description: string;
    type:string;
    statut: EtatDossier;
    dateCreation: Date;
  
    constructor(description: string, statut: EtatDossier, titre:string, type:string, dateCreation: Date,id?:string) {
      this.description = description;
      this.statut = statut;
      this.titre = titre;
      this.type=type;
      this.dateCreation=dateCreation;
      if (id) this.id = id;
    }
  
    toFirestore(): object {
      return {
        description: this.description,
        statut: this.statut,
        titre: this.titre ,
        type: this.type,
        dateCreation:this.dateCreation,
      };
    }

    static fromFirestore(data: FirebaseFirestore.DocumentData, id: string): DossierClient {
      return new DossierClient(
        data.description,
        data.statut as EtatDossier,      
        data.titre,
        data.type,
        data.dateCreation.toDate(),
        id
      );
    }
  }
  