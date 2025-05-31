/**
 * @file document.controller.ts
 * @description Contrôleur Express pour les documents.
 */

import { Request, Response } from 'express';
import { DocumentService } from '../services/DocumentService';
import { Document } from '../models/Document';
import { StatistiquesService } from "../services/StatistiqueService";


export class DocumentController {
  static async createDocument(req: Request, res: Response): Promise<void> {
    try {
      const { type, nom, contenu, dateAjout,} = req.body;

      const document = new Document(
        type,
        nom,
        contenu,
        new Date(dateAjout),
      );

      const id = await DocumentService.create(document);
      res.status(201).json({ id, message: 'Document créé avec succès.' });

      await StatistiquesService.incrementCounter("totaldocuments");

    } catch (error) {
      console.error('Erreur création document :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getDocumentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const document = await DocumentService.getById(id);

      if (!document) {
        res.status(404).json({ message: 'Document non trouvé.' });
        return;
      }

      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async updateDocument(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      await DocumentService.update(id, data);
      res.status(200).json({ message: 'Document mis à jour avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async deleteDocument(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await DocumentService.delete(id);
      res.status(200).json({ message: 'Document supprimé avec succès.' });

      await StatistiquesService.decrementCounter("totaldocuments");

    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getAllDocuments(req: Request, res: Response): Promise<void> {
    try {
      const documents = await DocumentService.getAll();
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
}
