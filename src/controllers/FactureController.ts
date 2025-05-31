/**
 * @file facture.controller.ts
 * @description Contrôleur Express pour la gestion des factures.
 */

import { Request, Response } from 'express';
import { FactureService } from '../services/FactureService';
import { Facture } from '../models/Facture';
import { StatistiquesService } from "../services/StatistiqueService";

export class FactureController {
  static async createFacture(req: Request, res: Response): Promise<void> {
    try {
      const { montant, dateEmission, statut , } = req.body;

      const facture = new Facture(
        montant,
        new Date(dateEmission),
        statut,
      );

      const id = await FactureService.create(facture);
      res.status(201).json({ id, message: 'Facture créée avec succès.' });

      await StatistiquesService.incrementCounter("totalFactures");

    } catch (error) {
      console.error('Erreur création facture :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getFactureById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const facture = await FactureService.getById(id);

      if (!facture) {
        res.status(404).json({ message: 'Facture non trouvée.' });
        return;
      }

      res.status(200).json(facture);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async updateFacture(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      await FactureService.update(id, data);
      res.status(200).json({ message: 'Facture mise à jour avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async deleteFacture(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await FactureService.delete(id);
      res.status(200).json({ message: 'Facture supprimée avec succès.' });

      await StatistiquesService.decrementCounter("totalFactures");

    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getAllFactures(req: Request, res: Response): Promise<void> {
    try {
      const factures = await FactureService.getAll();
      res.status(200).json(factures);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
}
