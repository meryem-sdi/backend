import { Utilisateur, StatutUtilisateur } from './Utilisateur';

/**
 * @class Administrateur
 * Représente un administrateur, héritant de Utilisateur.
 */
export class Administrateur extends Utilisateur {
  niveauAcces: string;

  constructor(
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    etat: StatutUtilisateur,
    niveauAcces: string
  ) {
    super(nom, prenom, email, motDePasse, etat);
    this.niveauAcces = niveauAcces;
  }

  override toFirestore(): object {
    return {
      ...super.toFirestore(),
      niveauAcces: this.niveauAcces,
      type: 'Administrateur'
    };
  }
  static fromFirestore(data: FirebaseFirestore.DocumentData): Administrateur {
    return new Administrateur(
      data.nom,
      data.prenom,
      data.email,
      data.motDePasse,
      data.etat as StatutUtilisateur,
      data.niveauAcces     // Firestore → Date JS
    );
  }
}
