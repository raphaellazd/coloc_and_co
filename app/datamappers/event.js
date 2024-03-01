
import client from '../services/pgClient.js';

const eventDataMapper = {

  async getEvents(colocId) {
    const sqlQuery = 'SELECT * FROM calendar_event WHERE colocation_id = $1 ';
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

  async createEvent(colocId, userId, body) {
    const sqlQuery = `
    INSERT INTO calendar_event (
      label,
      date,
      tag,
      user_id,
      colocation_id
    ) VALUES (
      COALESCE($1, 'Événement sans nom'),
      $2,
      $3,
      $4,
      $5
    )`;
    const values = [
      body.label,
      body.date,
      body.tag,
      userId,
      colocId,
    ];
    let result;
    let error;
    try {
      const response = await client.query(sqlQuery, values);
      result = response.rows;
    } catch (err) {
      error = err;
      console.error(error);
    }
    return { result, error };
  },

  async modifyEvent(eventId, body) {
    const sqlQuery = `
      UPDATE calendar_event
        SET
         label = COALESCE($1, label),
         date = COALESCE($2, date),
         tag = COALESCE($3, tag)
        WHERE 
          id = $4;
    `;
    const values = [
      body.label,
      body.date,
      body.tag,
      eventId,
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

  async deleteEvent(eventId) {
    const sqlQuery = 'DELETE FROM calendar_event WHERE id = $1;';
    const values = [eventId];
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

  async getEventsByTag(colocId, eventTag) {
    const sqlQuery = 'SELECT * FROM calendar_event WHERE tag = $1 AND colocation_id = $2;';
    const values = [eventTag, colocId];
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

export default eventDataMapper;
