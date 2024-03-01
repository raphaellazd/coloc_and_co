import { Router } from 'express';
import { expenseController, authController } from '../controllers/index.js';

const router = Router();

router.get('/', authController.verifyToken, expenseController.getAllExpenses);
router.post('/:coloc_id', expenseController.addExpense);
router.patch('/:coloc_id/:expense_id', expenseController.modifyExpense);
router.delete('/:coloc_id/:expense_id', expenseController.deleteExpense);
router.get('/balances', authController.verifyToken, expenseController.calculateBalance);
// router.get('/:coloc_id/:tag_expense', expenseController.getExpensesByTag);

export default router;
