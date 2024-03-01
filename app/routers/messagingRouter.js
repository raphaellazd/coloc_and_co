import { Router } from 'express';
import { messagingController } from '../controllers/index.js';

const router = Router();

router.get('/:coloc_id', messagingController.getAllMessages);
router.post('/:coloc_id', messagingController.createMessage);

export default router;
