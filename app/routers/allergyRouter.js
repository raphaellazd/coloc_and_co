import { Router } from 'express';
import { allergyController, authController } from '../controllers/index.js';

const router = Router();

router.get('/', authController.verifyToken, allergyController.getAllergiesFromUser);
router.post('/', authController.verifyToken, allergyController.addAllergyToUser);
router.post('/create', authController.verifyToken, allergyController.addAllergy);
router.delete('/', authController.verifyToken, allergyController.deleteAllergyFromUser);

export default router;
