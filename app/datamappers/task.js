import client from '../services/pgClient.js';

const taskDataMapper = {

  async getTasks(colocId) {
    const sqlQuery = `
      SELECT h.*, u.firstname
      FROM household_task h
      LEFT JOIN "user" u 
        ON h.user_id = u.id
      WHERE h.colocation_id = $1;
    `;
    const values = [colocId];
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

  async createTask(body, colocId) {
    const sqlQuery = `
      INSERT INTO "household_task" (description, colocation_id)
        VALUES (
          $1,
          $2
        )
      RETURNING *
    `;
    const values = [body.description, colocId];
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

  async updateTask(body, taskId) {
    const sqlQuery = `
      UPDATE "household_task"
        SET 
          description = COALESCE($1, description), 
          date = COALESCE($2, date), 
          done = COALESCE($3, done),
          user_id = COALESCE($4, user_id)
        WHERE id = $5
      RETURNING *
    `;
    const values = [
      body.description,
      body.date,
      body.done,
      body.user_id,
      taskId,
    ];
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

  async deleteTask(taskId) {
    const sqlQuery = 'DELETE FROM household_task WHERE id = $1;';
    const values = [taskId];
    let result;
    let error;
    try {
      const response = client.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },
};

export default taskDataMapper;
