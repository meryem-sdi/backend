import { Utilisateur, StatutUtilisateur } from './Utilisateur';

/**
 * @class Avocat
 * Représente un avocat, héritant de Utilisateur.
 */
export class Avocat extends Utilisateur {
  specialite: string;

  constructor(
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    etat: StatutUtilisateur,
    specialite: string,

  ) {
    super(nom, prenom, email, motDePasse, etat);
    this.specialite = specialite;
  }

  override toFirestore(): object {
    return {
      ...super.toFirestore(),
      specialite: this.specialite,
      type: 'Avocat'
    };
  }
  static fromFirestore(data: FirebaseFirestore.DocumentData): Avocat {
    return new Avocat(
      data.nom,
      data.prenom,
      data.email,
      data.motDePasse,
      data.etat as StatutUtilisateur,
      data.specialite,
    );
  }
}
