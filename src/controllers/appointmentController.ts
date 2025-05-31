import { Request, Response, NextFunction } from 'express';
import * as appointmentService from '../services/appointmentService';
import { IAppointment } from '../models/Appointment';
import admin from 'firebase-admin';
import { createEvents, EventAttributes } from 'ics';

/**
 * POST /api/appointments
 * Créer un nouveau rendez-vous.
 */
export async function createAppointment(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      idAvocat,
      idClient,
      dateHeure,
      type,
      notes,
    } = req.body;

    // Validation minimale
    if (!idAvocat || !idClient || !dateHeure || !type) {
      res.status(400).json({ message: 'Champs requis manquants.' });
      return;
    }

    // Construire l'objet partiel
    const appointmentData: Partial<IAppointment> = {
      idAvocat,
      idClient,
      dateHeure: admin.firestore.Timestamp.fromDate(new Date(dateHeure)),
      type,
      statut: 'programmé',
      notes: notes?.trim(),
    };

    const newAppointment = await appointmentService.createAppointment(appointmentData);
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/appointments
 * Lister les rendez-vous accessibles à l'utilisateur connecté.
 */
export async function getAppointmentsByUser(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const uid = req.user.uid;
    const role = req.user.role;

    // Récupérer d'éventuels filtres
    const dateFrom = req.query.dateFrom as string | undefined;
    const dateTo = req.query.dateTo as string | undefined;

    const appointmentList = await appointmentService.getAppointmentsForUser(uid, role, dateFrom, dateTo);
    res.status(200).json(appointmentList);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/appointments/:id
 * Récupérer un rendez-vous précis.
 */
export async function getAppointmentById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const appointmentId = req.params.id;
    const uid = req.user.uid;
    const role = req.user.role;

    const appointment = await appointmentService.getAppointmentById(appointmentId);
    if (!appointment) {
      res.status(404).json({ message: 'Rendez-vous non trouvé.' });
      return;
    }

    // Vérifier l'autorisation d'accès
    if (
      role === 'admin' ||
      role === 'secretaire' ||
      (role === 'avocat' && appointment.idAvocat === uid) ||
      (role === 'client' && appointment.idClient === uid)
    ) {
      res.status(200).json(appointment);
    } else {
      res.status(403).json({ message: 'Accès refusé à ce rendez-vous.' });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/appointments/:id
 * Mettre à jour un rendez-vous.
 */
export async function updateAppointment(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const appointmentId = req.params.id;
    const uid = req.user.uid;
    const role = req.user.role;
    const updates: Partial<IAppointment> = req.body;

    // Charger l'objet existant pour vérifier l'autorisation
    const existing = await appointmentService.getAppointmentById(appointmentId);
    if (!existing) {
      res.status(404).json({ message: 'Rendez-vous non trouvé.' });
      return;
    }

    // Règles d'autorisation
    const isAdminOrSecretaire = role === 'admin' || role === 'secretaire';
    const isAvocatConcerne = role === 'avocat' && existing.idAvocat === uid;
    const isClientConcerneEtModifiable =
      role === 'client' &&
      existing.idClient === uid &&
      existing.statut === 'programmé' &&
      (updates.dateHeure !== undefined || updates.notes !== undefined);

    if (!(isAdminOrSecretaire || isAvocatConcerne || isClientConcerneEtModifiable)) {
      res.status(403).json({ message: 'Accès refusé : vous ne pouvez pas modifier ce rendez-vous.' });
      return;
    }

    // Valider certains champs si présents
    if (updates.statut) {
      const validStatuts = ['programmé', 'terminé', 'annulé'];
      if (!validStatuts.includes(updates.statut)) {
        res.status(400).json({ message: 'Statut invalide.' });
        return;
      }
    }
    if (updates.dateHeure) {
      const newDate = new Date(updates.dateHeure as any);
      if (isNaN(newDate.getTime())) {
        res.status(400).json({ message: 'Format de date invalide.' });
        return;
      }
    }

    await appointmentService.updateAppointment(appointmentId, updates);
    res.status(200).json({ message: 'Rendez-vous mis à jour avec succès.' });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/appointments/:id
 * Supprimer un rendez-vous.
 */
export async function deleteAppointment(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const appointmentId = req.params.id;
    const uid = req.user.uid;
    const role = req.user.role;

    const existing = await appointmentService.getAppointmentById(appointmentId);
    if (!existing) {
      res.status(404).json({ message: 'Rendez-vous non trouvé.' });
      return;
    }

    // Règles de suppression
    const isAdminOrSecretaire = role === 'admin' || role === 'secretaire';
    const isAvocatConcerne = role === 'avocat' && existing.idAvocat === uid;
    const isClientConcerneEtAnnulable =
      role === 'client' && existing.idClient === uid && existing.statut === 'programmé';

    if (!(isAdminOrSecretaire || isAvocatConcerne || isClientConcerneEtAnnulable)) {
      res.status(403).json({ message: 'Accès refusé : vous ne pouvez pas supprimer ce rendez-vous.' });
      return;
    }

    await appointmentService.deleteAppointment(appointmentId);
    res.status(200).json({ message: 'Rendez-vous supprimé avec succès.' });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/appointments/calendar
 * Renvoyer tous les RDV de l'utilisateur connecté sous forme "événements" JSON,
 * filtrés entre dateFrom et dateTo.
 */
export async function getCalendarEvents(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const uid = req.user.uid;
    const role = req.user.role;

    // Récupérer éventuellement les query params dateFrom et dateTo
    const dateFromQS = req.query.dateFrom as string | undefined;
    const dateToQS = req.query.dateTo as string | undefined;

    // Valider les dates si fournies
    if (dateFromQS && isNaN(new Date(dateFromQS).getTime())) {
      res.status(400).json({ message: 'Paramètre dateFrom invalide.' });
      return;
    }
    if (dateToQS && isNaN(new Date(dateToQS).getTime())) {
      res.status(400).json({ message: 'Paramètre dateTo invalide.' });
      return;
    }

    // Récupérer les rendez-vous via le service
    const appointments = await appointmentService.getAppointmentsForUser(uid, role, dateFromQS, dateToQS);

    // Transformer en "événements" adaptés au calendrier
    const events = appointments.map((appt) => {
      const startDate = appt.dateHeure.toDate();
      // On suppose 1h de durée par défaut
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

      return {
        id: appt.id,
        title: `${appt.type.charAt(0).toUpperCase() + appt.type.slice(1)} – ${appt.id}`,
        start: startDate,
        end: endDate,
        allDay: false,
        status: appt.statut,
        description: appt.notes || '',
        linkedUrl: `/app/appointments/${appt.id}`
      };
    });

    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/appointments/calendar/ics
 * Générer un fichier ICS à télécharger pour le calendrier.
 */
export async function downloadCalendarICS(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Utilisateur non authentifié.' });
      return;
    }

    const uid = req.user.uid;
    const role = req.user.role;

    // Si admin, on autorise la génération d'ICS pour un autre userId en query
    const targetUserId = req.query.userId as string | undefined;
    let effectiveUid = uid;
    if (targetUserId) {
      if (role !== 'admin') {
        res.status(403).json({ message: 'Seul un administrateur peut générer l\'ICS pour un autre utilisateur.' });
        return;
      }
      effectiveUid = targetUserId;
    }

    const dateFromQS = req.query.dateFrom as string | undefined;
    const dateToQS = req.query.dateTo as string | undefined;

    // Valider les dates si fournies
    if (dateFromQS && isNaN(new Date(dateFromQS).getTime())) {
      res.status(400).json({ message: 'Paramètre dateFrom invalide.' });
      return;
    }
    if (dateToQS && isNaN(new Date(dateToQS).getTime())) {
      res.status(400).json({ message: 'Paramètre dateTo invalide.' });
      return;
    }

    // Récupérer les rendez-vous via le service
    const appointments = await appointmentService.getAppointmentsForUser(effectiveUid, role, dateFromQS, dateToQS);

    // Construire un tableau d'événements ICS
    const icsEvents: EventAttributes[] = appointments.map((appt) => {
      const startDate = appt.dateHeure.toDate();
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

      const startArray: [number, number, number, number, number] = [
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
      ];

      const endArray: [number, number, number, number, number] = [
        endDate.getFullYear(),
        endDate.getMonth() + 1,
        endDate.getDate(),
        endDate.getHours(),
        endDate.getMinutes(),
      ];

      const eventTitle = `RDV ${appt.type.charAt(0).toUpperCase() + appt.type.slice(1)} – ${appt.id}`;
      const descriptionLines = [
        `Statut : ${appt.statut}`,
        appt.notes ? `Notes : ${appt.notes}` : '',
      ]
        .filter((l) => l)
        .join('\n');

      return {
        start: startArray,
        end: endArray,
        title: eventTitle,
        description: descriptionLines,
        uid: `${appt.id}@mon-avocat-app`,
        status: appt.statut === 'annulé' ? 'CANCELLED' : 'CONFIRMED',
        alarms: [
          {
            action: 'display',
            description: 'Rendez-vous dans 15 minutes',
            trigger: { minutes: 15, before: true }
          }
        ]
      };
    });

    // Générer le contenu ICS
    const { error, value } = createEvents(icsEvents);
    if (error) {
      console.error('Erreur ICS :', error);
      res.status(500).json({ message: 'Erreur interne : impossible de générer le fichier ICS.' });
      return;
    }

    if (!value) {
      res.status(500).json({ message: 'Erreur interne : impossible de générer le fichier ICS.' });
      return;
    }

    // Configurer l'en-tête pour forcer le téléchargement
    res.setHeader('Content-Disposition', `attachment; filename="calendar_${effectiveUid}.ics"`);
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.status(200).send(value);
  } catch (error) {
    next(error);
  }
} 