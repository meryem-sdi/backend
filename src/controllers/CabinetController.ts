/**
 * @file cabinet.controller.ts
 * @description Contrôleur Express pour les opérations liées aux cabinets.
 */

import { Request, Response } from 'express';
import { CabinetService } from '../services/CabinetService';
import { Cabinet } from '../models/Cabinet';
import { GeoPoint } from 'firebase-admin/firestore';
import { StatistiquesService } from "../services/StatistiqueService";

export class CabinetController {
  static async createCabinet(req: Request, res: Response): Promise<void> {
    try {
      const {
        adresse,
        num,
        nom,
        email,
        tel,
        horaireOuverture,
        horaireFermeture,
        localisation,
      } = req.body;

      const geoPoint = new GeoPoint(localisation.latitude, localisation.longitude);

      const cabinet = new Cabinet(
        adresse,
        num,
        nom,
        email,
        tel,
        horaireOuverture,
        horaireFermeture,
        geoPoint,
      );

      const id = await CabinetService.create(cabinet);
      res.status(201).json({ id, message: 'Cabinet créé avec succès.' });

      await StatistiquesService.incrementCounter("totalcabinets");
      
    } catch (error) {
      console.error('Erreur lors de la création du cabinet :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getCabinetById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cabinet = await CabinetService.getById(id);
      if (!cabinet) {
        res.status(404).json({ message: 'Cabinet non trouvé.' });
        return;
      }
      res.status(200).json(cabinet);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async updateCabinet(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      if (data.localisation) {
        data.localisation = new GeoPoint(data.localisation.latitude, data.localisation.longitude);
      }

      await CabinetService.update(id, data);
      res.status(200).json({ message: 'Cabinet mis à jour avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async deleteCabinet(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await CabinetService.delete(id);
      res.status(200).json({ message: 'Cabinet supprimé avec succès.' });

      await StatistiquesService.decrementCounter("totalcabinets");

    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getAllCabinets(req: Request, res: Response): Promise<void> {
    try {
      const cabinets = await CabinetService.getAll();
      res.status(200).json(cabinets);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
}
