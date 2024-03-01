import client from "../services/pgClient.js";

const ruleDataMapper = {
  async getRules(colocId) {
    const sqlQuery = `SELECT content FROM house_rule 
      JOIN colocation_has_house_rule 
      ON house_rule.id = colocation_has_house_rule.house_rule_id 
      WHERE colocation_has_house_rule.colocation_id = $1`;
    const values = [colocId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      console.log(err);
      error = err;
    }
    return { result, error };
  },
  async createRules(content, colocId) {
    const queryRule = {
      text: `INSERT INTO "house_rule"(content, colocation_id)
      VALUES  ($1, $2) RETURNING *;`,
      values: [content, colocId],
    };
    try {
      const rulesCreated = await client.query(queryRule);
      const queryJunction = {
        text: `INSERT INTO "colocation_has_house_rule"(colocation_id, house_rule_id)
        VALUES  ($1,$2);`,
        values: [colocId, rulesCreated.rows[0].id],
      };
      const junctionTableQuery = await client.query(queryJunction);
      if (junctionTableQuery) {
        return rulesCreated;
      }
    } catch (err) {
      console.log(err);
      error = err;
    }
    return { result, error };
  },
  async modifyRules(colocId, body) {
    const sqlQuery = `UPDATE house_rule SET content = $1 FROM colocation_has_house_rule
    WHERE house_rule.id = colocation_has_house_rule.house_rule_id 
    AND colocation_has_house_rule.colocation_id = $2
    RETURNING content`;
    // eslint-disable-next-line max-len
    const values = [body.content, colocId]; // est ce que colocId necessaire si articleId unique ?
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

export default ruleDataMapper;
