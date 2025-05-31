//src/config/firebase.ts
import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

import serviceAccount from './gestion-cabinet-avocat-firebase-adminsdk-fbsvc-1cbe21a628.json'; // Fichier téléchargé

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://gestion-cabinet-avocat.firebaseio.com"
});

const firebaseConfig = {
  apiKey: "AIzaSyDU5R3q8qo9hPh8m2j-0a8c84fkZEaBNw8",
  authDomain: "gestion-cabinet-avocat.firebaseapp.com",
  projectId: "gestion-cabinet-avocat",
  storageBucket: "gestion-cabinet-avocat.appspot.com",
  messagingSenderId: "313795893001",
  appId: "1:313795893001:web:30b87cf3c37bb152da65d8",
  measurementId: "G-XE3KNF69EB"
};

const app = initializeApp(firebaseConfig);

export const Clientdb = getFirestore(app);
export const admindb = admin.firestore();

export const adminauth = admin.auth();
export const clientAuth = getAuth(app);