import client from '../services/pgClient.js';

const allergyDataMapper = {

  async findAll() {
    const sqlQuery = `
      SELECT a.id, a.label, tc.label  
      FROM allergy a 
      JOIN allergy_has_tag_color ahtc 
        ON a.id = ahtc.allergy_id
      JOIN tag_color tc
        ON ahtc.tag_color_id = tc.id ;`;
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery);
      result = response.rows;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  async findAllergiesByUserId(userId) { // peut etre pas necessaire puisque on 
  // charge tout ca dans la meth du userDM getOneUserFromColoc
    const sqlQuery = `
    SELECT a.id, a.label, tc.label  
    FROM allergy a 
    JOIN allergy_has_tag_color ahtc 
      ON a.id = ahtc.allergy_id
    JOIN tag_color tc
      ON ahtc.tag_color_id = tc.id 
    WHERE user_has_allergy.user_id = $1;`;
    const values = [userId];
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

  // Method to add allergy in BDD
  async addAllergy(body) {
    const sqlQuery = `
      INSERT INTO "allergy" (label, tag_color_id) 
      VALUES (
        $1,
        (SELECT floor(random() * 11 ) + 1)
      ) 
      RETURNING *;
    `;
    const values = [body.label];
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

  async addAllergyToUser(userId, allergyLabel) {
    const sqlQuery = `
      INSERT INTO user_has_allergy (user_id, allergy_id)
      VALUES (
        $1,
        (SELECT id FROM allergy
      WHERE label = $2)
      );
    `;
    const values = [userId, allergyLabel];
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

  async deleteAllergyToUser(userId, allergyLabel) {
    const sqlQuery = `
      DELETE FROM user_has_allergy
      WHERE user_id = $1 
      AND allergy_id = (
        SELECT id FROM allergy
        WHERE label = $2
      );
    `;
    const values = [userId, allergyLabel];
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

export default allergyDataMapper;
