import { messagingDataMapper } from "../datamappers/index.js";

const messagingController = {

  getAllMessages: async (req, res) => {
    console.log(req.params.coloc_id);
    const { result, error } = await messagingDataMapper.getAllMessages(req.params.coloc_id);

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },
  createMessage: async (req, res) => {
    console.log(req.params.coloc_id, req.body);
    const { result, error } = await messagingDataMapper.createMessage(
      req.params.coloc_id,
      req.body,
    );

    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },
};

export default messagingController;
