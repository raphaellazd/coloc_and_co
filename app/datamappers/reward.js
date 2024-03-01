import client from '../services/pgClient.js';

const rewardDataMapper = {
  async getRewards(userId) {
    const sqlQuery = 'SELECT label, picture FROM reward JOIN user_has_reward ON reward.id = user_has_reward.reward_id WHERE user_has_reward.user = $1;';
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
};

export default rewardDataMapper;
