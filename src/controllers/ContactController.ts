/**
 * @file ContactController.ts
 * @description Contrôleur Express pour les messages de contact.
 */

import { Request, Response } from 'express';
import { ContactService } from '../services/ContactService';
import { Contact } from '../models/Contact';
import { Utilisateur } from '../models/Utilisateur';
import { UtilisateurService } from '../services/UtilisateurService';
import { StatistiquesService } from "../services/StatistiqueService";

export class ContactController {
  static async createContact(req: Request, res: Response): Promise<void> {
    try {
      const { destinataire, source, message, dateHeure, heure, lu } = req.body;

 // Fonction pour résoudre un utilisateur  par nom/prénom
       async function resolveUser(input: any): Promise<Utilisateur | null> {
            if (input.nom && input.prenom) {
                   return await UtilisateurService.getByNomPrenom(input.nom, input.prenom);
            }
            return null;
        }
              
      const destinataireUser = await resolveUser(destinataire);
      const sourceUser = await resolveUser(source);

      if (!destinataireUser || !sourceUser) {
        res.status(404).json({ message: 'Utilisateur destinataire ou source introuvable.' });
        return;
      }
      const contact = new Contact(
        destinataireUser,
        sourceUser,
        message,
        new Date(dateHeure),
        lu
      );

      const id = await ContactService.create(contact);
      res.status(201).json({ id, message: 'Message envoyé avec succès.' });

      await StatistiquesService.incrementCounter("totalcontacts");

    } catch (error) {
      console.error('Erreur lors de la création du message :', error);
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getContactById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const contact = await ContactService.getById(id);

      if (!contact) {
        res.status(404).json({ message: 'Message non trouvé.' });
        return;
      }

      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async updateContact(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      await ContactService.update(id, data);
      res.status(200).json({ message: 'Message mis à jour avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async deleteContact(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await ContactService.delete(id);
      res.status(200).json({ message: 'Message supprimé avec succès.' });

      await StatistiquesService.decrementCounter("totalcontacts");

    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }

  static async getAllContacts(req: Request, res: Response): Promise<void> {
    try {
      const contacts = await ContactService.getAll();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.' });
    }
  }
}