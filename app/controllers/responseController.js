import { responseDataMapper } from "../datamappers/index.js";

const responseController = {
  test: (req, res) => {
    res.send('response Controller');
  },
  getResponsesByPolls: async (req, res) => {
    const { result, error } = await responseDataMapper.getResponses(
      req.params.poll_id,
    );

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },

  postResponseForPoll: async (req, res) => {
    const { result, error } = await responseDataMapper.postResponse(
      req.body, // BOOL
      req.params.poll_id,
      req.params.user_id,
    );

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },
};

export default responseController;
