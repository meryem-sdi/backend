import { Router } from 'express';
import authRoutes from './authRoutes';
import dossierRoutes from './dossierRoutes';
import appointmentRoutes from './appointmentRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/dossiers', dossierRoutes);
router.use('/appointments', appointmentRoutes);

export default router; 