/**
 * @file Document.ts
 * @description Représente un document ajouté dans le système.
 */

export class Document {
    type: string;
    nom: string;
    contenu: string;
    dateAjout: Date;
    
    constructor(type: string, nom: string, contenu: string, dateAjout: Date,) {
      this.type = type;
      this.nom = nom;
      this.contenu = contenu;
      this.dateAjout = dateAjout;
    }
  
    toFirestore(): object {
      return {
        type: this.type,
        nom: this.nom,
        contenu: this.contenu,
        dateAjout:this.dateAjout,
      };
    }
    static fromFirestore(data: FirebaseFirestore.DocumentData): Document {
      return new Document(
        data.type,
        data.dateAjout.toDate(),
        data.dossierId,
        data.contenu,
      );
    }
    }
  

  
  