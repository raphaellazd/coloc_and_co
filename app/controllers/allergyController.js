import { allergyDataMapper } from "../datamappers/index.js";

const allergyController = {

  getAllergiesFromUser: async (req, res) => {
    const { result, error } = await allergyDataMapper.findAllergiesByUserId(
      req.user.userId,
    );
    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
      console.log('getAllergiesFromUser =>', result);
    }
  },

  addAllergyToUser: async (req, res) => {
    const { result, error } = await allergyDataMapper.addAllergyToUser(
      req.user.userId,
      req.body.allergy,
    );
    if (error) {
      console.log(error);
    } else {
      res.status(201).json(result);
      console.log('addAllergyToUser =>', result);
    }
  },

  addAllergy: async (req, res) => {
    const { result, error } = await allergyDataMapper.addAllergy(
      req.body.allergy,
    );
    if (error) {
      console.log(error);
    } else {
      res.status(201).json(result);
      console.log('addAllergy =>', result);
    }
  },

  deleteAllergyFromUser: async (req, res) => {
    const { result, error } = await allergyDataMapper.deleteAllergyToUser(
      req.user.user_id,
      req.body.allergy,
    );
    if (error) {
      console.log(error);
    } else {
      res.status(200).json(result);
      console.log('deleteAllergyFromUser =>', result);
    }
  },
};

export default allergyController;
