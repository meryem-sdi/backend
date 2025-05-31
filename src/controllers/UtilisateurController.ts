import { Request, Response } from 'express';
import { UtilisateurService } from '../services/UtilisateurService';
import { StatistiquesService } from "../services/StatistiqueService";

export class UtilisateurController {
  static async create(req: Request, res: Response) {
    try {
      const utilisateur = await UtilisateurService.create(req.body);
      res.status(201).json(utilisateur);

      await StatistiquesService.incrementCounter("totalUtilisateur");

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const utilisateurs = await UtilisateurService.getAll();
      res.json(utilisateurs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const utilisateur = await UtilisateurService.getById(req.params.id);
      res.json(utilisateur);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const utilisateur = await UtilisateurService.update(req.params.id, req.body);
      res.json(utilisateur);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await UtilisateurService.delete(req.params.id);
      res.json({ message: 'Utilisateur supprimé' });

      await StatistiquesService.decrementCounter("totalUtilisateur");

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
