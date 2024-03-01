import { Router } from 'express';
import { eventController, authController } from '../controllers/index.js';

const router = Router();

router.get('/', authController.verifyToken, eventController.getEventsByColocation); // ok
router.post('/', authController.verifyToken, eventController.createEvent); // ok

router.patch('/:event_id', authController.verifyToken, eventController.modifyEvent); // ok
router.delete('/:event_id', authController.verifyToken, eventController.deleteEvent); // ok

router.get('/:event_tag', authController.verifyToken, eventController.getEventsByTag); // ok

export default router;
