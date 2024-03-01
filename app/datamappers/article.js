import client from '../services/pgClient.js';

const articleDataMapper = {
  async getArticles(colocId) {
    const sqlQuery = 'SELECT * FROM article_shoplist WHERE id = $1';
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
  async addArticle(colocId, body) {
    const sqlQuery = 'INSERT INTO article_shoplist (name, colocation_id) VALUES ($2, $1) WHERE colocation_id = $1 RETURNING name as article_name';
    const values = [colocId, body.name];
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

  async modifyArticle(colocId, articleId, body) {
    const sqlQuery = 'UPDATE article_shoplist SET name = $1 WHERE id = $2 AND colocation_id = $3';
    // eslint-disable-next-line max-len
    const values = [body.name, articleId, colocId]; // est ce que colocId necessaire si articleId unique ?
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

  async deleteArticle(colocId, articleId) {
    const sqlQuery = 'DELETE FROM article_shoplist WHERE id = $2 AND colocation_id = $3';
    // eslint-disable-next-line max-len
    const values = [articleId, colocId]; // est ce que colocId necessaire si articleId unique ?
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error };
  }
};


export default articleDataMapper;