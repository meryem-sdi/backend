import { Request, Response } from 'express';
import { AdministrateurService } from '../services/AdministrateurService';

export class AdministrateurController {
  static async create(req: Request, res: Response) {
    try {
      const admin = await AdministrateurService.create(req.body);
      res.status(201).json(admin);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const data = await AdministrateurService.getAll();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const data = await AdministrateurService.getById(req.params.id);
      res.json(data);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = await AdministrateurService.update(req.params.id, req.body);
      res.json(data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await AdministrateurService.delete(req.params.id);
      res.json({ message: 'Administrateur supprimé' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
