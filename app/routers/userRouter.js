import { Router } from 'express';
import { authController, userController } from '../controllers/index.js';
import upload from '../../file-upload.js';

const router = Router();

router.post('/login', userController.loginUser);

router.get('/all', authController.verifyToken, userController.getAllUsersFromColoc);

router.post('/create', userController.createUserAndColoc);
router.post('/join', userController.createUserAndJoinColoc);

router.post('/upload_avatar', authController.verifyToken, upload.single('file'), userController.uploadAvatar);

router.patch('/update_profile', authController.verifyToken, userController.updateUser);

router.get('/', authController.verifyToken, userController.getLoggedUser);
router.get('/:user_id', authController.verifyToken, userController.getUserFromColoc);
router.patch('/', authController.verifyToken, userController.updateUser);
router.delete('/', authController.verifyToken, userController.deleteUser);

export default router;
