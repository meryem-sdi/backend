import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService';
import { StatistiquesService } from "../services/StatistiqueService";

export class ClientController {
  static async create(req: Request, res: Response) {
    try {
      const client = await ClientService.create(req.body);
      res.status(201).json(client);

      await StatistiquesService.incrementCounter("totalClients");

    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const data = await ClientService.getAll();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const data = await ClientService.getById(req.params.id);
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = await ClientService.update(req.params.id, req.body);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await ClientService.delete(req.params.id);
      res.json({ message: 'Client supprimé' });

      await StatistiquesService.decrementCounter("totalClients");


    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
