import express from "express";
import { StatistiquesService } from "../services/StatistiqueService";
import { admindb } from "../config/firebase-admin";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const stats = await StatistiquesService.getCounters();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Nouvelle route dynamique (recompte en direct dans Firestore)
router.get("/compteurs", async (req, res) => {
  try {
    const totalAvocats = await StatistiquesService.countDocumentsFromFirestore("Avocats");
    const totalClients = await StatistiquesService.countDocumentsFromFirestore("Clients");
    const totalSecretaires = await StatistiquesService.countDocumentsFromFirestore("Secretaires");
    const totalutilisateur = await StatistiquesService.countDocumentsFromFirestore("utilisateur");
    const totalrendezvous = await StatistiquesService.countDocumentsFromFirestore("rendezvous");
    const totalfactures = await StatistiquesService.countDocumentsFromFirestore("factures");
    const totaldossiers = await StatistiquesService.countDocumentsFromFirestore("dossiers");
    const totaldocuments = await StatistiquesService.countDocumentsFromFirestore("documents");
    const totalcontacts = await StatistiquesService.countDocumentsFromFirestore("contacts");
    const totalcabinets = await StatistiquesService.countDocumentsFromFirestore("cabinets");

    const rdvEnAttente = await admindb.collection("rendezvous").where("statut", "==", "enAttente").get();
    const dossierEnCours = await admindb.collection("dossiers").where("statut", "==", "enCours").get();
    const utilisateursActifs = await admindb.collection("utilisateur").where("etat", "==", "Actif").get();
    const avocatsActifs = await admindb.collection("Avocats").where("etat", "==", "Actif").get();
    const clientsActifs = await admindb.collection("Clients").where("etat", "==", "Actif").get();
    const secretairesActifs = await admindb.collection("Secretaires").where("etat", "==", "Actif").get();
    const FactureImpayée = await admindb.collection("Facture").where("statut","==","Non payée").get();


    res.status(200).json({
      totalAvocats,
      totalClients,
      totalSecretaires,
      totalutilisateur,
      totalrendezvous,
      totalfactures,
      totaldossiers,
      totaldocuments,
      totalcontacts,
      totalcabinets,
      totalRendezVousEnAttente: rdvEnAttente.size,
      totalDossiersEnCours: dossierEnCours.size,
      totalutilisateursActifs:utilisateursActifs.size,
      totalAvocatsActifs: avocatsActifs.size,
      totalSecretairesActifs: secretairesActifs.size,
      totalClientsActifs: clientsActifs.size,
      totalFactureImpayée : FactureImpayée.size
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
