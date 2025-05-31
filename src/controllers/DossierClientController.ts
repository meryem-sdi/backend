/**
 * @file dossierclient.controller.ts
 * @description Contrôleur Express pour les dossiers clients.
 */

import { Request, Response } from 'express';
import { DossierClientService } from '../services/DossierClientServices';
import { DossierClient, EtatDossier } from '../models/DossierClient';
import { StatistiquesService } from "../services/StatistiqueService";

export class DossierClientController {
  static async createDossier(req: Request, res: Response): Promise<void> {
    try {
      const { description, statut, titre, type, dateCreation ,cabinetId,} = req.body;

      if (!Object.values(EtatDossier).includes(statut)) {
        res.status(400).json({ message: 'Statut invalide.' });
        return;
      }

      const dossier = new DossierClient(description, statut, titre , type , dateCreation ? new Date(dateCreation) : new Date(), cabinetId,);
      const id = await DossierClientService.create(dossier);
      res.status(201).json({ id, message: 'Dossier créé avec succès.' });

      await StatistiquesService.incrementCounter("totaldossiers");

    } catch (error) {
      console.error('Erreur création dossier :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getDossierById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dossier = await DossierClientService.getById(id);
      if (!dossier) {
        res.status(404).json({ message: 'Dossier non trouvé.' });
        return;
      }
      res.status(200).json(dossier);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async updateDossier(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      if (data.statut && !Object.values(EtatDossier).includes(data.statut)) {
        res.status(400).json({ message: 'Statut invalide.' });
        return;
      }

      await DossierClientService.update(id, data);
      res.status(200).json({ message: 'Dossier mis à jour avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async deleteDossier(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await DossierClientService.delete(id);
      res.status(200).json({ message: 'Dossier supprimé avec succès.' });

      await StatistiquesService.decrementCounter("totaldossiers");

    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getAllDossiers(req: Request, res: Response): Promise<void> {
    try {
      const dossiers = await DossierClientService.getAll();
      res.status(200).json(dossiers);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
}
