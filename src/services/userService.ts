import { db } from '../config/firebase';
import { IUser } from '../models/User';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * Crée un profil utilisateur dans Firestore
 */
export async function createUserProfile(userData: {
  uid: string;
  email: string;
  prenom: string;
  nom: string;
  role: 'client' | 'avocat' | 'secretaire' | 'admin';
}): Promise<IUser> {
  try {
    const userRef = db.collection('users').doc(userData.uid);
    
    const user: IUser = {
      id: userData.uid,
      email: userData.email,
      prenom: userData.prenom,
      nom: userData.nom,
      role: userData.role,
      dateCreation: Timestamp.now(),
      dateMiseAJour: Timestamp.now()
    };

    await userRef.set(user);
    return user;
  } catch (error) {
    console.error('Erreur lors de la création du profil utilisateur:', error);
    throw error;
  }
}

/**
 * Récupère le profil d'un utilisateur depuis Firestore
 */
export async function getUserProfile(uid: string): Promise<IUser | null> {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return null;
    }

    return userDoc.data() as IUser;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur:', error);
    throw error;
  }
}

/**
 * Met à jour le profil d'un utilisateur dans Firestore
 */
export async function updateUserProfile(
  uid: string,
  updates: Partial<IUser>
): Promise<IUser> {
  try {
    const userRef = db.collection('users').doc(uid);
    
    // Ajouter la date de mise à jour
    const dataToUpdate = {
      ...updates,
      dateMiseAJour: Timestamp.now()
    };

    await userRef.update(dataToUpdate);
    
    // Récupérer le profil mis à jour
    const updatedDoc = await userRef.get();
    return updatedDoc.data() as IUser;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
    throw error;
  }
} 