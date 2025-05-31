import { Router } from 'express';
import { AvocatController } from '../controllers/AvocatController';

const router = Router();

router.post('/', AvocatController.create);
router.get('/', AvocatController.getAll);
router.get('/:id', AvocatController.getById);
router.put('/:id', AvocatController.update);
router.delete('/:id', AvocatController.delete);

export default router;
