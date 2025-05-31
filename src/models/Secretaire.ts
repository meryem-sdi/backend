import { Utilisateur, StatutUtilisateur } from './Utilisateur';

/**
 * @class Secretaire
 * Représente une secrétaire, héritant de Utilisateur.
 */
export class Secretaire extends Utilisateur {

  constructor(
    nom: string,
    prenom: string,
    email: string,
    motDePasse: string,
    etat: StatutUtilisateur,
  ) {
    super(nom, prenom, email, motDePasse, etat);
  }

  override toFirestore(): object {
    return {
      ...super.toFirestore(),
      type: 'Secretaire'
    };
  }
  static fromFirestore(data: FirebaseFirestore.DocumentData): Secretaire {
    return new Secretaire(
      data.nom,
      data.prenom,
      data.email,
      data.motDePasse,
      data.etat as StatutUtilisateur,

    );
  }
}

