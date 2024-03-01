import { Router } from 'express';
import { colocationController } from '../controllers/index.js';

const router = Router();

router.post('/join', colocationController.joinColoc);

router.patch('/:coloc_id', colocationController.modifyColoc);
router.delete('/:coloc_id', colocationController.deleteColoc);

export default router;
