import { Router } from 'express';
import { responseController } from '../controllers/index.js';

const router = Router();

router.get('/:poll_id', responseController.getResponsesByPolls);
router.post('/:poll_id/:user_id', responseController.postResponseForPoll);

export default router;
