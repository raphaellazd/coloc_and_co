import { expenseDataMapper } from "../datamappers/index.js";

const expenseController = {

  getAllExpenses: async (req, res) => {
    const { result, error } = await expenseDataMapper.getExpenses(req.user.colocId);

    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
      console.log(result);
    }
  },
  addExpense: async (req, res) => {
    const { result, error } = await expenseDataMapper.addExpense(req.user.colocId);

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },
  modifyExpense: async (req, res) => {
    const { result, error } = await expenseDataMapper.modifyExpense(
      req.params.colocId,
      req.params.expense_id,
      req.body,
    );

    if (error) {
      console.error(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },
  deleteExpense: async (req, res) => {
    const { result, error } = await expenseDataMapper.deleteExpense(
      req.params.expense_id,
    );
    if (error) {
      console.error(error);
    } else {
      res.status(200).json({ message: 'expense successfully deleted!'});
      console.log(result);
    }
  },

  calculateBalance: async (req, res) => {
    const balances = {};
    const { result, error } = await expenseDataMapper.getExpenses(req.user.colocId);
    if (error) {
      console.error(error);
    } else {
      result.forEach((expense) => {
        const { user_id, sum } = expense;
        if (!balances[user_id]) {
          balances[user_id] = 0;
        }
        balances[user_id] += sum;
      });
      console.log(balances);
      res.status(200).json(balances);
    }
  },
};

export default expenseController;
