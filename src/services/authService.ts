import admin from 'firebase-admin';

type UserRole = 'client' | 'avocat' | 'secretaire' | 'admin';

/**
 * Crée un utilisateur dans Firebase Auth avec un rôle personnalisé
 */
export async function createFirebaseUser(
  email: string,
  password: string,
  role: UserRole
): Promise<admin.auth.UserRecord> {
  try {
    // 1. Créer l'utilisateur dans Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
    });

    // 2. Définir le custom claim "role"
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    // 3. Retourner l'utilisateur créé
    return userRecord;
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur Firebase:', error);
    throw error;
  }
}

/**
 * Vérifie si un utilisateur existe dans Firebase Auth
 */
export async function userExists(uid: string): Promise<boolean> {
  try {
    await admin.auth().getUser(uid);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Récupère le rôle d'un utilisateur depuis ses custom claims
 */
export async function getUserRole(uid: string): Promise<UserRole | null> {
  try {
    const user = await admin.auth().getUser(uid);
    return user.customClaims?.role as UserRole || null;
  } catch (error) {
    console.error('Erreur lors de la récupération du rôle:', error);
    return null;
  }
} 