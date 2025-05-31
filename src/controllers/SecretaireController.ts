import { Request, Response } from 'express';
import { SecretaireService } from '../services/SecretaireService';
import { StatistiquesService } from "../services/StatistiqueService";

export class SecretaireController {
  static async create(req: Request, res: Response) {
    try {
      const secretaire = await SecretaireService.create(req.body);
      res.status(201).json(secretaire);

      await StatistiquesService.incrementCounter("totalSecretaires");

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const data = await SecretaireService.getAll();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const data = await SecretaireService.getById(req.params.id);
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = await SecretaireService.update(req.params.id, req.body);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await SecretaireService.delete(req.params.id);
      res.json({ message: 'Secretaire supprimé' });

      await StatistiquesService.decrementCounter("totalSecretaires");

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
