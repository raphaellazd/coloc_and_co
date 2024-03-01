import client from '../services/pgClient.js';

const expenseDataMapper = {

  async getExpenses(colocId) {
    const sqlQuery = 'SELECT * FROM expense WHERE colocation_id = $1 ';
    const values = [colocId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error }; // je retourne les resultats au controller
  },

  async addExpense(colocId, body) { 
    const sqlQuery = 'INSERT INTO expense (label, sum, user_id, coloc_id) VALUES ($1, $2, $3, $4)';
    const values = [body.label, body.sum, body.userId, colocId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  async modifyExpense(colocId, expenseId, body) { //! besoin de modifier depenses ? 
    const sqlQuery = 'UPDATE expense SET () WHERE id = $1 colocation_id = $2;';
    const values = [expenseId, colocId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  async deleteExpense(colocId, expenseId) {
    const sqlQuery = 'DELETE FROM expense WHERE id = $1 coloc_id = $2;';
    const values = [expenseId, colocId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

//   async getEventsByTag(colocId, expenseTag) {
//     const sqlQuery = 'SELECT * FROM expense WHERE tag = $1 coloc_id = $2;';
//     const values = [expenseTag, colocId];
//     let result;
//     let error;
//     try {
//       const response = await client.query(sqlQuery, values);
//       result = response.rows;
//     } catch (err) {
//       error = err;
//     }
//     return { result, error };
//   },
}


export default expenseDataMapper;