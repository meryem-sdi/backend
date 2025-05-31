import { Router } from 'express';
import { AdministrateurController } from '../controllers/AdministrateurController';

const router = Router();

router.post('/', AdministrateurController.create);
router.get('/', AdministrateurController.getAll);
router.get('/:id', AdministrateurController.getById);
router.put('/:id', AdministrateurController.update);
router.delete('/:id', AdministrateurController.delete);

export default router;
