import { Request, Response } from 'express';
import { AvocatService } from '../services/AvocatService';
import { StatistiquesService } from "../services/StatistiqueService";

export class AvocatController {
  static async create(req: Request, res: Response) {
    try {
      const avocat = await AvocatService.create(req.body);
      res.status(201).json(avocat);

      await StatistiquesService.incrementCounter("totalAvocats");


    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const data = await AvocatService.getAll();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const data = await AvocatService.getById(req.params.id);
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = await AvocatService.update(req.params.id, req.body);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await AvocatService.delete(req.params.id);
      res.json({ message: 'Avocat supprimé' });

      await StatistiquesService.decrementCounter("totalAvocats");

    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
