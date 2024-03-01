
import client from '../services/pgClient.js';

const pollDataMapper = {
  //! Est ce quon va chercher les reponses aussi JOIN ?
  //! du coup comment on sait sondage cloturé ou pas ?
  async getPolls(colocId) {
    const sqlQuery = 'SELECT * FROM poll WHERE coloc_id = $1';
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

  async createPoll(colocId, body) {
    const sqlQuery = 'INSERT INTO poll (question, colocation_id) VALUES ($1, $2)';
    const values = [body.content, colocId];
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

export default pollDataMapper;
