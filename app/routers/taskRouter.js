import { Router } from 'express';
import { taskController, authController } from '../controllers/index.js';

const router = Router();

router.get('/', authController.verifyToken, taskController.getAllTasks);
router.post('/:coloc_id', taskController.createTask);

//router.post('/:coloc_id/:user_id', taskController.createTaskToUser);

router.patch('/:coloc_id/:task_id', taskController.modifyTask);
router.delete('/:task_id', taskController.deleteTask);

//router.get('/:coloc_id/:task_tag', taskController.getTasksByTag);

export default router;