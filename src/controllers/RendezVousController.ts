/**
 * @file rendezvous.controller.ts
 * @description Contrôleur Express pour la gestion des rendez-vous.
 */

import { Request, Response } from 'express';
import { RendezVousService } from '../services/RendezVousService';
import { RendezVous, EtatRdv } from '../models/RendezVous';
import { StatistiquesService } from "../services/StatistiqueService";

export class RendezVousController {
  static async createRendezVous(req: Request, res: Response): Promise<void> {
    try {
      const { dateHeure, statut ,  objet, lieu, calendrierId, clientId, cabinetId} = req.body;

      const rdv = new RendezVous(new Date(dateHeure), statut as EtatRdv, objet, );
      const id = await RendezVousService.create(rdv);

      res.status(201).json({ id, message: 'Rendez-vous créé avec succès.' });

      await StatistiquesService.incrementCounter("totalrendezvous");

    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getRendezVousById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const rdv = await RendezVousService.getById(id);

      if (!rdv) {
        res.status(404).json({ message: 'Rendez-vous non trouvé.' });
        return;
      }

      res.status(200).json(rdv);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async updateRendezVous(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      await RendezVousService.update(id, data);

      res.status(200).json({ message: 'Rendez-vous mis à jour avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async deleteRendezVous(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await RendezVousService.delete(id);
      res.status(200).json({ message: 'Rendez-vous supprimé avec succès.' });

      await StatistiquesService.decrementCounter("totalrendezvSous");

    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getAllRendezVous(req: Request, res: Response): Promise<void> {
    try {
      const rdvs = await RendezVousService.getAll();
      res.status(200).json(rdvs);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
}
