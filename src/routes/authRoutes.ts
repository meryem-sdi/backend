import { Router } from 'express';
import { login, register, getMyProfile, logout } from '../controllers/authController';
import { validateToken } from '../middlewares/authMiddleware';

const router = Router();

/**
 * POST /api/auth/login
 * Connexion de l'utilisateur
 */
router.post('/login', login);

/**
 * POST /api/auth/register
 * Inscription d'un nouvel utilisateur :
 *  - Créer l'utilisateur dans Firebase Auth (email + password)
 *  - Définir son custom claim "role" (par défaut "client" ou passé en paramètre si admin créé nouvel utilisateur)
 *  - Créer le document "users/{uid}" dans Firestore
 *  - Retour : objet User (sans mot de passe)
 */
router.post('/register', register);

/**
 * GET /api/auth/me
 * Récupérer le profil de l'utilisateur connecté (depuis Firestore).
 * Le middleware validateToken a déjà injecté req.user.uid.
 */
router.get('/me', validateToken, getMyProfile);

/**
 * POST /api/auth/logout
 * Logout "virtuel" : on peut révoquer tous les tokens Firebase de l'utilisateur pour forcer 
 * une déconnexion de tous les devices. 
 * Ensuite, le frontend supprime le token localement.
 */
router.post('/logout', validateToken, logout);

export default router;