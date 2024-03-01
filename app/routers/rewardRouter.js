import { Router } from 'express';
import { rewardController } from '../controllers/index.js';

const router = Router();

router.get('/:user_id', rewardController.getRewardsByUser);

export default router;
