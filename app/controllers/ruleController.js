import { ruleDataMapper } from "../datamappers/index.js";
//! ok
const ruleController = {
  getRules: async (req, res) => {
    const { result, error } = await ruleDataMapper.getRules(req.user.colocId);
    console.log("req.user: ", req.user);
    console.log("headers: ", req.headers);
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      res.json(result);
    }
  },
  createOrPatchRules: async (req, res) => {
    try {
      const { result, error } = await ruleDataMapper.getRules(req.user.colocId);
      if (result.length) {
        const modifiedRules = await ruleDataMapper.modifyRules(
          req.user.colocId,
          req.body
        );
        res.json(modifiedRules.rows);
      } else {
        const createdRules = await ruleDataMapper.createRules(
          req.body.content,
          req.user.colocId
        );
        res.json(createdRules.rows[0]);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  modifyRules: async (req, res) => {
    const { result, error } = await ruleDataMapper.modifyRules(
      req.user.colocId,
      req.body.content
    );
    if (error) {
      console.log(error);
    } else {
      res.json(result);
      console.log(result);
    }
  },
};

export default ruleController;
