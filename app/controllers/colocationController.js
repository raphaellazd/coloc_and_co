import { v4 as uuidv4 } from 'uuid';
import { colocationDataMapper } from '../datamappers/index.js';

const colocationController = {

  joinColoc: async (req, res) => {
    try {
      const { codecoloc } = req.body;
      const result = await colocationDataMapper.getCodeOfColoc(codecoloc);
      if (result) {
        res
          .status(200)
          .json({
            message: `Le code est valide (${codecoloc}). L'id de la colocation est ${result.id}`,
          });
      } else {
        res.status(401).json("Le code n'est pas valide");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  modifyColoc: async (req, res) => {
    console.log(req.body);
    console.log(req.params.coloc_id);
    const { result, error } = await colocationDataMapper.modifyColoc(req.params.coloc_id, req.body);

    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
      console.log(result);
    }
  },

  deleteColoc: async (req, res) => {
    console.log(req.params.coloc_id);
    const { result, error } = await colocationDataMapper.deleteColoc(req.params.coloc_id);

    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
      console.log(result);
    }
  },
};

export default colocationController;
