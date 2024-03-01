import client from "../services/pgClient.js";

const userDataMapper = {
  // Get infos about an user from his email
  async getCredentials(body) {
    const sqlQuery = 'SELECT * FROM "user" WHERE email = $1;';
    const values = [body.email];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  // Get infos about all users from a colocation
  async getUsers(colocId) {
    const sqlQuery = 'SELECT * FROM "user" WHERE "colocation_id" = $1;';
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

  // Method to create an User
  async createUser(email, password, colocId) {
    const sqlQuery = ` INSERT INTO "user" ("email", "password", colocation_id) 
      VALUES ($1, $2, $3) RETURNING id;`;
    const values = [email, password, colocId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows[0]; // on renvoie l'id
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  // Get infos about the logged user
  async getLoggedUser(userId) {
    const sqlQuery = `
    SELECT * FROM "user" u 
     WHERE u.id = $1;
    `;
    const values = [userId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      console.log(response.rows);
      result = response.rows[0];
    } catch (err) {
      error = err;
      console.log(err);
    }
    return result;
  },

  // Get info of a specific user in a specific colacation
  async getOneUserFromColoc(userId, colocId) {
    const sqlQuery = `
    SELECT * FROM "user" u 
      JOIN user_has_allergy uha
        ON u.id = uha.user_id
      JOIN allergy a
        ON uha.allergy_id = a.id
      JOIN tag_color tc
        ON a.tag_color_id = tc.id
    WHERE u."id" = $1 AND u.colocation_id = $2;
    `;
    const values = [userId, colocId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  // Method to delete an user
  async deleteOneUser(userId) {
    const sqlQuery = 'DELETE FROM "user" WHERE "id" = $1 RETURNING "email";';
    const value = [userId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, value);
      result = response.rowCount === 1;
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  // Method to update profile page
  async updateProfile(body, userId) {
    console.log("duhuhdu", body);
    const sqlQuery = `
    UPDATE "user" 
    SET 
      firstname = COALESCE($1, firstname), 
      lastname = COALESCE($2, lastname),
      birthdate = COALESCE($3, birthdate),
      phone_number = COALESCE($4, phone_number),
      email = COALESCE($5, email),
      description = COALESCE($6, description),
      pet = COALESCE($7, pet),
      worktime_table = COALESCE($8, worktime_table),
      emergency_name = COALESCE($9, emergency_name),
      emergency_link = COALESCE($10, emergency_link),
      emergency_number = COALESCE($11, emergency_number),
      profession = COALESCE($12, profession),
      avatar_file = COALESCE($13, avatar_file),
      available = COALESCE($14, available)
    WHERE id = $15
    RETURNING *;
    `;
    const values = [
      body.firstname,
      body.lastname,
      body.birthdate,
      body.phone_number,
      body.email,
      body.description,
      body.pet,
      body.worktime_table,
      body.emergency_name,
      body.emergency_link,
      body.emergency_number,
      body.profession,
      body.filePath,
      body.available,
      userId,
    ];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows; // [0]
      console.log(result);
    } catch (err) {
      error = err;
    }
    return { result, error };
  },

  // Change password of a user
  async changePassword(newPassword, userId) {
    const sqlQuery = 'UPDATE "user" SET password = $1 WHERE "id" = $2;';
    const values = [newPassword, userId];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows[0];
    } catch (err) {
      error = err;
    }
    return { result, error };
  },
};

export default userDataMapper;
