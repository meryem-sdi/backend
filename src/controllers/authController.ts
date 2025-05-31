import { Request, Response, NextFunction } from 'express';
import { ClientService } from '../services/ClientService';
import { AvocatService } from '../services/AvocatService';
import { SecretaireService } from '../services/SecretaireService';
import jwt from 'jsonwebtoken';
import * as authService from '../services/authService';
import * as userService from '../services/userService';
import admin from 'firebase-admin';
import { IUser } from '../models/User';

type RequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/**
 * POST /api/auth/login
 * Connexion de l'utilisateur
 */
export const login: RequestHandler = async (req, res, next) => {
  try {
    res.status(400).json({ 
      message: 'Cette route n\'est plus utilisée. Veuillez utiliser Firebase Auth côté client.' 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/register
 * Inscription d'un nouvel utilisateur.
 * Attendu dans req.body : { email, password, prenom, nom, role? }
 * Si role n'est pas fourni, on met "client" par défaut.
 */
export const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, prenom, nom, role } = req.body;

    // 1) Validation minimale
    if (!email || !password || !prenom || !nom) {
      res.status(400).json({ message: 'Champs requis manquants.' });
      return;
    }

    // Validation de l'email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ message: 'Email invalide.' });
      return;
    }

    // Validation du mot de passe
    if (password.length < 8) {
      res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères.' });
      return;
    }

    // Role par défaut "client"
    const userRole: 'client' | 'avocat' | 'secretaire' | 'admin' = 
      ['client', 'avocat', 'secretaire', 'admin'].includes(role) 
        ? (role as any) 
        : 'client';

    // Si role demandé n'est pas "client" et que le caller n'est pas admin, on refuse
    if (role && role !== 'client' && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Accès refusé : rôle non autorisé.' });
      return;
    }

    // 2) Créer l'utilisateur dans Firebase Auth
    const userRecord = await authService.createFirebaseUser(email, password, userRole);

    // 3) Créer le document "users/{uid}" dans Firestore
    const newUser: IUser = await userService.createUserProfile({
      uid: userRecord.uid,
      email,
      prenom,
      nom,
      role: userRole,
    });

    // 4) Retourner le profil utilisateur (sans mot de passe)
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error('register error:', error);
    // Si Firebase Auth renvoie une erreur de type "email-already-exists"
    if (error.code === 'auth/email-already-exists') {
      res.status(400).json({ message: 'Cet e-mail est déjà utilisé.' });
      return;
    }
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Récupérer le profil de l'utilisateur connecté (depuis Firestore).
 * Le middleware validateToken a déjà injecté req.user.uid.
 */
export const getMyProfile: RequestHandler = async (req, res, next) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const userProfile = await userService.getUserProfile(uid);
    if (!userProfile) {
      res.status(404).json({ message: 'Profil utilisateur introuvable.' });
      return;
    }
    res.status(200).json(userProfile);
  } catch (error) {
    console.error('getMyProfile error:', error);
    next(error);
  }
};

/**
 * POST /api/auth/logout
 * Logout "virtuel" : on peut révoquer tous les tokens Firebase de l'utilisateur pour forcer 
 * une déconnexion de tous les devices. 
 * Ensuite, le frontend supprime le token localement.
 */
export const logout: RequestHandler = async (req, res, next) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    // Révoquer tous les tokens refresh de l'utilisateur
    await admin.auth().revokeRefreshTokens(uid);
    res.status(200).json({ message: 'Déconnexion effectuée. Tokens révoqués.' });
  } catch (error) {
    console.error('logout error:', error);
    next(error);
  }
};