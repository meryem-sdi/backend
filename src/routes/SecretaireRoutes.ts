import { Router } from 'express';
import { SecretaireController } from '../controllers/SecretaireController';

const router = Router();

router.post('/', SecretaireController.create);
router.get('/', SecretaireController.getAll);
router.get('/:id', SecretaireController.getById);
router.put('/:id', SecretaireController.update);
router.delete('/:id', SecretaireController.delete);

export default router;
