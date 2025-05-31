import { Router } from 'express';
import * as appointmentController from '../controllers/appointmentController';
import { validateToken, checkRole } from '../middlewares/authMiddleware';

const router = Router();

/**
 * POST /api/appointments
 * Créer un nouveau rendez-vous (accessible à : client, secrétaire, admin)
 */
router.post(
  '/',
  validateToken,
  checkRole(['client', 'secretaire', 'admin']),
  appointmentController.createAppointment
);

/**
 * GET /api/appointments
 * Lister les rendez-vous accessibles à l'utilisateur authentifié.
 */
router.get(
  '/',
  validateToken,
  appointmentController.getAppointmentsByUser
);

/**
 * GET /api/appointments/:id
 * Récupérer un RDV précis
 */
router.get(
  '/:id',
  validateToken,
  appointmentController.getAppointmentById
);

/**
 * PUT /api/appointments/:id
 * Mettre à jour un RDV
 */
router.put(
  '/:id',
  validateToken,
  checkRole(['avocat', 'secretaire', 'admin']),
  appointmentController.updateAppointment
);

/**
 * DELETE /api/appointments/:id
 * Supprimer un RDV
 */
router.delete(
  '/:id',
  validateToken,
  checkRole(['avocat', 'client', 'secretaire', 'admin']),
  appointmentController.deleteAppointment
);

/**
 * GET /api/appointments/calendar
 * Renvoyer tous les RDV de l'utilisateur connecté sous forme "événements" JSON,
 * filtrés entre dateFrom et dateTo.
 * Query params optionnels : ?dateFrom=2025-06-01&dateTo=2025-06-30
 */
router.get(
  '/calendar',
  validateToken,
  appointmentController.getCalendarEvents
);

/**
 * GET /api/appointments/calendar/ics
 * Générer un fichier ICS (iCalendar) pour la plage spécifiée,
 * ou pour l'utilisateur connecté (admin peut préciser un userId différent).
 * Query params possibles :
 *   - dateFrom=2025-06-01
 *   - dateTo=2025-06-30
 *   - (optionnel) userId=<uid>  (seulement si admin)
 */
router.get(
  '/calendar/ics',
  validateToken,
  appointmentController.downloadCalendarICS
);

export default router; 