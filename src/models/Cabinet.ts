/**
 * @file Cabinet.ts
 * @description Représente un cabinet d’avocat.
 */

import { GeoPoint } from 'firebase-admin/firestore';

export class Cabinet {

  adresse: string;
  num: number;
  nom: string;
  email: string;
  tel: number;
  horaireOuverture: string;
  horaireFermeture: string;
  localisation: GeoPoint;


  constructor(
    adresse: string,
    num: number,
    nom: string,
    email: string,
    tel: number,
    horaireOuverture: string,
    horaireFermeture: string,
    localisation: GeoPoint,
  ) {
    this.adresse = adresse;
    this.num = num;
    this.nom = nom;
    this.email = email;
    this.tel = tel;
    this.horaireOuverture = horaireOuverture;
    this.horaireFermeture = horaireFermeture;
    this.localisation = localisation;
  }

  toFirestore(): object {
    return {
      adresse: this.adresse,
      num: this.num,
      nom: this.nom,
      email: this.email,
      tel: this.tel,
      horaireOuverture: this.horaireOuverture,
      horaireFermeture: this.horaireFermeture,
      localisation: this.localisation,
    };
  }

    static fromFirestore(data: FirebaseFirestore.DocumentData): Cabinet {
      return new Cabinet(
        data.adresse,
        data.num,
        data.nom,
        data.email,
        data.tel,
        data.horaireOuverture,
        data.horaireFermeture,
        data.localisation,
      );
    }
}
