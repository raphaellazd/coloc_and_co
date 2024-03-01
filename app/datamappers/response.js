
import client from '../services/pgClient.js';

const responseDataMapper = {

  async getResponses(pollId) {
    const sqlQuery = 'SELECT * FROM responses WHERE poll_id = $1';
    const values = [colocId, pollId];
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

  async postResponse(body, pollId, userId) {
    const sqlQuery = 'INSERT INTO response (response, poll_id, user_id) VALUES ($1, $2, $3, $4)';
    const values = [body.response, pollId, userId];
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

};


export default responseDataMapper;
