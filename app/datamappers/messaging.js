
import client from '../services/pgClient.js';

const messagingDataMapper = {
  async getAllMessages(colocId) {
    const sqlQuery = 'SELECT * FROM message WHERE coloc_id = $1';
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
  async createMessage(colocId, body) {
    const sqlQuery = 'INSERT INTO message (content, colocation_id, user_id) VALUES ($1, $2, $3)';
    const values = [body.content, colocId, body.user_id]; // user_id a recup dans le token
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

export default messagingDataMapper;

