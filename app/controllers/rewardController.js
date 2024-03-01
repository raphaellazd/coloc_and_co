import { rewardDataMapper } from "../datamappers/index.js";

const rewardController = {
  getRewardsByUser: async (req, res) => {
    const { result, error } = await rewardDataMapper.getRewards(req.params.user_id);

    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
      console.log(result);
    }
  },
};

export default rewardController;
