/**
 * @file calendrier.controller.ts
 * @description Contrôleur Express pour la gestion du calendrier.
 */

import { Request, Response } from 'express';
import { CalendrierService } from '../services/CalendrierService';
import { Calendrier } from '../models/Calendrier';

export class CalendrierController {
  static async createCalendrier(req: Request, res: Response): Promise<void> {
    try {
      const { date, heureDebut, heureFin, statuts, rendezVousId } = req.body;
      const cal = new Calendrier(new Date(date), heureDebut, heureFin, statuts, );

      const id = await CalendrierService.create(cal);
      res.status(201).json({ id, message: 'Créneau ajouté au calendrier.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getCalendrierById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cal = await CalendrierService.getById(id);

      if (!cal) {
        res.status(404).json({ message: 'Créneau non trouvé.' });
        return;
      }

      res.status(200).json(cal);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async updateCalendrier(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      await CalendrierService.update(id, data);

      res.status(200).json({ message: 'Créneau mis à jour.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async deleteCalendrier(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await CalendrierService.delete(id);

      res.status(200).json({ message: 'Créneau supprimé.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getAllCalendriers(req: Request, res: Response): Promise<void> {
    try {
      const calendriers = await CalendrierService.getAll();
      res.status(200).json(calendriers);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
}
