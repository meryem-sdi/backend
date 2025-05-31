"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const gestion_cabinet_avocat_firebase_adminsdk_fbsvc_1cbe21a628_json_1 = __importDefault(require("./gestion-cabinet-avocat-firebase-adminsdk-fbsvc-1cbe21a628.json")); // Fichier téléchargé
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(gestion_cabinet_avocat_firebase_adminsdk_fbsvc_1cbe21a628_json_1.default),
    databaseURL: "https://gestion-cabinet-avocat.firebaseio.com"
});
exports.db = firebase_admin_1.default.firestore();
exports.auth = firebase_admin_1.default.auth();
