import client from '../services/pgClient.js';

const colocationDataMapper = {

  // Method to create a new colocation
  async createColoc(groupName, codeColoc) {
    const sqlQuery = `
      INSERT INTO "colocation" ("group_name", "code_coloc") 
        VALUES 
        ($1, $2) 
      RETURNING id, code_coloc;
    `;
    const values = [groupName, codeColoc];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = err;
      console.error('Erreur lors de la création de la colocation: ', error);
    }
    return result;
  },

  // Method to get the uuid of a colocation
  async getCodeOfColoc(codeColoc) {
    const sqlQuery = 'SELECT * FROM "colocation" WHERE code_coloc = $1;';
    const values = [codeColoc];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows[0]
    } catch (err) {
      error = err;
      console.error(error);
    }
    return result;
  },
  async getCodeOfColoc(codeColoc) {
    const sqlQuery = 'SELECT * FROM "colocation" WHERE code_coloc = $1;';
    const values = [codeColoc];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = err;
      console.error(error);
    }
    return result;
  },
  async getColocInfo(colocId) {
    const sqlQuery = 'SELECT * FROM colocation WHERE id = $1;';
    const values = [colocId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = err;
      console.log(error);
    }
    return result; // return { result, error };
  },

  // Method to modify colocation's infos
  async updateColoc(body, colocId) {
    const sqlQuery = `
      UPDATE colocation
        SET
          group_name = COALESCE($1, group_name),
          address = COALESCE($2, address)
      WHERE id = $3
      RETURNING *;
    `;
    const values = [
      body.groupName,
      body.address,
      colocId,
    ];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      error = err;
      console.log(error);
    }
    return { result, error };
  },

  async deleteColoc(colocId) {
    const sqlQuery = 'DELETE FROM colocation WHERE id = $1;';
    const values = [colocId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      error = err;
      console.log(error);
    }
    return { result, error };
  },
};

export default colocationDataMapper;
