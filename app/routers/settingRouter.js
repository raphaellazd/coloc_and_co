import { Router } from 'express';
import { authController, settingController} from '../controllers/index.js'

const router = Router();

// Récupérer les infos de l'utilisateur connectée et de sa coloc
router.get('/', authController.verifyToken, settingController.getSettings); // ok

// Modifier les infos de la personne connectée ou de sa coloc respective
router.patch('/', authController.verifyToken, settingController.setSettings); // ok

// Modifier le mot de passe de l'utilisateur connecté
router.patch('/password', authController.verifyToken, settingController.changePassword);// ok

export default router;
