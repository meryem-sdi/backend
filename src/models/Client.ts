import { Utilisateur, StatutUtilisateur } from './Utilisateur';

/**
 * @class Client
 * Représente un client, héritant de Utilisateur.
 */
export class Client extends Utilisateur {


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
      type: 'Client'
    };
  }
  static fromFirestore(data: FirebaseFirestore.DocumentData): Client {
    return new Client(
      data.nom,
      data.prenom,
      data.email,
      data.motDePasse,
      data.etat as StatutUtilisateur,
    );
  }
}
