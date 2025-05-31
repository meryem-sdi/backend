"use strict";
/**
 * @file Utilisateur.ts
 * @description Modèle de données pour un utilisateur avec validation d'email et mot de passe.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utilisateur = exports.StatutUtilisateur = void 0;
var StatutUtilisateur;
(function (StatutUtilisateur) {
    StatutUtilisateur["Actif"] = "Actif";
    StatutUtilisateur["Suspendu"] = "Suspendu";
    StatutUtilisateur["EnAttente"] = "enAttente";
})(StatutUtilisateur || (exports.StatutUtilisateur = StatutUtilisateur = {}));
class Utilisateur {
    constructor(nom, prenom, email, motDePasse, etat) {
        if (!Utilisateur.validateEmail(email)) {
            throw new Error('Adresse email invalide.');
        }
        if (!Utilisateur.validatePassword(motDePasse)) {
            throw new Error('Mot de passe invalide. Il doit contenir au moins 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial.');
        }
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.etat = etat;
    }
    /**
     * Valide l'email avec une expression régulière.
     */
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    /**
     * Valide la sécurité du mot de passe.
     * Min 8 caractères, 1 maj, 1 min, 1 chiffre, 1 caractère spécial.
     */
    static validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&\-_#]{8,}$/;
        return passwordRegex.test(password);
    }
    toFirestore() {
        return {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            motDePasse: this.motDePasse,
            etat: this.etat,
        };
    }
}
exports.Utilisateur = Utilisateur;
