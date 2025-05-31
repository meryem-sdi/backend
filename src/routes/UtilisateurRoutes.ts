import { Router } from 'express';
import { UtilisateurController } from '../controllers/UtilisateurController';

const router = Router();

router.post('/', UtilisateurController.create);
router.get('/', UtilisateurController.getAll);
router.get('/:id', UtilisateurController.getById);
router.put('/:id', UtilisateurController.update);
router.delete('/:id', UtilisateurController.delete);

export default router;
