// import client from "../services/pgClient.js";

// const pollDataMapper = {
//   //! Est ce quon va chercher les reponses aussi JOIN ?
//   //! du coup comment on sait sondage cloturé ou pas ?
//   async getPolls(colocId) {
//     const sqlQuery = `
//     SELECT question, response, user_id FROM poll 
//     JOIN response r 
//     ON poll.id = r.poll_id
//     WHERE colocation_id = $1`;

//     const sqlQuery2 = 'SELECT * FROM poll WHERE colocation_id = $1';

//     const values = [colocId];
//     let result;
//     let result2;
//     let error;
//     try {
//       const response = await client.query(sqlQuery, values);
//       const response2 = await client.query(sqlQuery2, values);
//       result = response.rows;
//       result2 = response2.rows;
//      // let resultSecond = response2.rows;
//     } catch (err) {
//       error = err;
//     }
//     return {result, result2};
//   },

//   async createPoll(body, colocId) {
//     const sqlQuery = `
//     INSERT INTO "poll" (question, colocation_id) VALUES 
//     ($1, $2);`;
//     const values = [body.question, colocId];
//     let result;
//     let error;
//     try {
//       const response = await client.query(sqlQuery, values);
//       result = response.rows;
//     } catch (err) {
//       error = err;
//     }
//     return result;
//   },

//   async answerToPoll(body, pollId){
//     const sqlQuery = `
//     INSERT INTO "response" (response, user_id, poll_id) VALUES 
//     ($1, $2, $3);`
//     const values = [body.response, body.user_id, pollId];
//     let result;
//     let error;
//     try {
//       const response = await client.query(sqlQuery, values);
//       result = response.rows;
//       //console.log(response)
//     } catch (err) {
//       error = err;
//     }
//     return result;
//   },

// };

// export default pollDataMapper;

import { pollDataMapper } from '../datamappers/index.js';

const pollController = {
  getAllPollsByColocation: async (req, res) => {
    const { result, result2 } = await pollDataMapper.getPolls(req.user.colocId);

    res.status(200).json({ result, result2 });
    console.log('Les résultats de ce sondage sont les suivants :', result);
  },

  createPoll: async (req, res) => {
    console.log(req.body)
    const result = await pollDataMapper.createPoll(
      req.body,
      req.params.coloc_id
    );

    console.log('New poll successfully created ! =>', result);
    return res.json(result);
  },

  // voir pour ajouter un deuxieme paramètre
  answerToPoll: async (req, res) => {
    const result = await pollDataMapper.answerToPoll(
      req.body,
      req.params.poll_id,
    );
    console.log('Voici le nouveau resultat:', result);
    return res.status(200).json(result);
  },

  getOnePollById: async (req, res) => {
    console.log(req.params.coloc_id);
    const { result, error } = await pollDataMapper.getOnePoll(
      req.params.coloc_id,
    );
    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
      console.log(result);
    }
  },
};

export default pollController;
