import { Router } from 'express';
import { authController, pollController } from '../controllers/index.js';

const router = Router();

router.get('/all', authController.verifyToken, pollController.getAllPollsByColocation);
router.post('/:coloc_id', pollController.createPoll);
router.post('/answer/:poll_id', pollController.answerToPoll);

router.get('/:coloc_id/:poll_id', pollController.getOnePollById);

export default router;